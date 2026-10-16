#!/usr/bin/env bash
# One-time setup of the GCP project the website deploys to. Safe to re-run.
#
# Everything here stays inside GCP's always-free tier at this site's traffic:
# Firebase Hosting (the static site), one Cloud Run function (the /api), Cloud
# Build for its image, Artifact Registry capped to the newest two images, and
# two Secret Manager secrets.
#
# Run it as a project Owner, logged in to both gcloud and gh:
#   ./infra/gcp-setup.sh
# It ends by storing the two values the GitHub workflow needs as repo secrets.
set -euo pipefail

PROJECT="${PROJECT:-dutchschoolke}"
REGION="${REGION:-us-central1}" # a free-tier region for Cloud Run, Build and Storage
REPO="${REPO:-sammydeprez/dutch-school-web}"
DEPLOY_SA="github-deployer"
RUNTIME_SA="website-api"
POOL="github"
PROVIDER="github-actions"

gc() { gcloud --project "$PROJECT" "$@"; }
NUMBER=$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')
DEPLOY="$DEPLOY_SA@$PROJECT.iam.gserviceaccount.com"
RUNTIME="$RUNTIME_SA@$PROJECT.iam.gserviceaccount.com"
COMPUTE="$NUMBER-compute@developer.gserviceaccount.com"

echo "==> APIs"
gc services enable run.googleapis.com cloudbuild.googleapis.com \
  artifactregistry.googleapis.com secretmanager.googleapis.com \
  iamcredentials.googleapis.com sts.googleapis.com \
  firebase.googleapis.com firebasehosting.googleapis.com

echo "==> Firebase on the project"
# A Google account's first Firebase project needs the terms accepted in the
# console, which the CLI cannot do, so check rather than try to add it.
if ! npx -y firebase-tools@14 hosting:sites:list --project "$PROJECT" 2>/dev/null | grep -q "$PROJECT.web.app"; then
  echo "Firebase is not on $PROJECT yet. Add it at https://console.firebase.google.com"
  echo "(Create a project -> add Firebase to an existing Google Cloud project), then re-run."
  exit 1
fi

echo "==> Artifact Registry repo for the function's image, newest two kept"
gc artifacts repositories describe cloud-run-source-deploy --location "$REGION" >/dev/null 2>&1 ||
  gc artifacts repositories create cloud-run-source-deploy --location "$REGION" \
    --repository-format docker --description "Cloud Run source deploys"
POLICY=$(mktemp)
cat >"$POLICY" <<'JSON'
[
  {"name": "keep-two", "action": {"type": "Keep"}, "mostRecentVersions": {"keepCount": 2}},
  {"name": "delete-rest", "action": {"type": "Delete"}, "condition": {"tagState": "ANY"}}
]
JSON
gc artifacts repositories set-cleanup-policies cloud-run-source-deploy --location "$REGION" \
  --policy "$POLICY" --no-dry-run >/dev/null
rm -f "$POLICY"

echo "==> Service accounts"
for sa in "$DEPLOY_SA" "$RUNTIME_SA"; do
  gc iam service-accounts describe "$sa@$PROJECT.iam.gserviceaccount.com" >/dev/null 2>&1 ||
    gc iam service-accounts create "$sa"
done
for role in roles/run.admin roles/cloudbuild.builds.editor roles/storage.admin \
  roles/artifactregistry.writer roles/firebasehosting.admin \
  roles/secretmanager.admin roles/serviceusage.serviceUsageConsumer; do
  gc projects add-iam-policy-binding "$PROJECT" --member "serviceAccount:$DEPLOY" \
    --role "$role" --condition None >/dev/null
done
# The deployer runs the function as the runtime account, and source deploys
# build as the Compute default account.
for sa in "$RUNTIME" "$COMPUTE"; do
  gc iam service-accounts add-iam-policy-binding "$sa" \
    --member "serviceAccount:$DEPLOY" --role roles/iam.serviceAccountUser >/dev/null
done
gc projects add-iam-policy-binding "$PROJECT" --member "serviceAccount:$COMPUTE" \
  --role roles/run.builder --condition None >/dev/null

echo "==> Secrets (the workflow syncs their values from GitHub secrets)"
for s in MAILERSEND_API_TOKEN GITHUB_TOKEN; do
  gc secrets describe "$s" >/dev/null 2>&1 ||
    gc secrets create "$s" --replication-policy automatic
  gc secrets add-iam-policy-binding "$s" --member "serviceAccount:$RUNTIME" \
    --role roles/secretmanager.secretAccessor >/dev/null
done

echo "==> Workload Identity Federation for GitHub Actions (no keys)"
gc iam workload-identity-pools describe "$POOL" --location global >/dev/null 2>&1 ||
  gc iam workload-identity-pools create "$POOL" --location global --display-name "GitHub"
gc iam workload-identity-pools providers describe "$PROVIDER" --location global \
  --workload-identity-pool "$POOL" >/dev/null 2>&1 ||
  gc iam workload-identity-pools providers create-oidc "$PROVIDER" --location global \
    --workload-identity-pool "$POOL" --issuer-uri https://token.actions.githubusercontent.com \
    --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --attribute-condition "assertion.repository_owner == 'sammydeprez'"
gc iam service-accounts add-iam-policy-binding "$DEPLOY" --role roles/iam.workloadIdentityUser \
  --member "principalSet://iam.googleapis.com/projects/$NUMBER/locations/global/workloadIdentityPools/$POOL/attribute.repository/$REPO" >/dev/null

echo "==> GitHub secrets on $REPO"
gh secret set GCP_WIF_PROVIDER --repo "$REPO" \
  --body "projects/$NUMBER/locations/global/workloadIdentityPools/$POOL/providers/$PROVIDER"
gh secret set GCP_DEPLOY_SA --repo "$REPO" --body "$DEPLOY"

echo "Done. Push to main (or run the CI/CD workflow) to deploy."
