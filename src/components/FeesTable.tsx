'use client';

import { useLocale, useTranslations } from 'next-intl';
import schoolFees from '@/data/school-fees.json';

function formatCurrency(amount: number): string {
  return `€${amount.toLocaleString()}`;
}

const MORNING_KEYS = ['2', '3', '4', '5'] as const;

export default function FeesTable() {
  const locale = useLocale();
  const t = useTranslations('feesPage.table');
  const tToddler = useTranslations('feesPage.toddlerSection');

  return (
    <div className="space-y-10">
      {/* One-time Fees */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="bg-muted/30 px-6 py-4">
          <h3 className="text-xl font-bold text-foreground">
            {locale === 'nl' ? 'Eenmalige Kosten' : 'One-time Fees'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  {t('feeType')}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                  {t('amount')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  {t('note')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-6 py-4 text-foreground font-medium">
                  {locale === 'nl' ? schoolFees.oneTimeFees.entryFee.nameNl : schoolFees.oneTimeFees.entryFee.name}
                </td>
                <td className="px-6 py-4 text-center font-bold text-primary text-lg">
                  {formatCurrency(schoolFees.oneTimeFees.entryFee.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-muted">
                  {locale === 'nl' ? schoolFees.oneTimeFees.entryFee.noteNl : schoolFees.oneTimeFees.entryFee.note}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-foreground font-medium">
                  {locale === 'nl' ? schoolFees.oneTimeFees.deposit.nameNl : schoolFees.oneTimeFees.deposit.name}
                </td>
                <td className="px-6 py-4 text-center">
                  <div><span className="text-sm text-muted">{locale === 'nl' ? 'Tariefgroep 1' : 'Tariff 1'}:</span> <span className="font-bold text-primary text-lg">{formatCurrency(schoolFees.oneTimeFees.deposit.tariff1)}</span></div>
                  <div><span className="text-sm text-muted">{locale === 'nl' ? 'Tariefgroep 2' : 'Tariff 2'}:</span> <span className="font-bold text-primary text-lg">{formatCurrency(schoolFees.oneTimeFees.deposit.tariff2)}</span></div>
                </td>
                <td className="px-6 py-4 text-sm text-muted">
                  {locale === 'nl' ? schoolFees.oneTimeFees.deposit.noteNl : schoolFees.oneTimeFees.deposit.note}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Toddler Tariffs */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="bg-secondary px-6 py-4">
          <h3 className="text-xl font-bold text-white">
            {tToddler('title')}
          </h3>
          <p className="text-white/80 text-sm">
            {tToddler('subtitle')}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Trimester' : 'Term'}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Weken' : 'Weeks'}
                </th>
                {MORNING_KEYS.map((n) => (
                  <th key={n} className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    {n} {tToddler('morningsSuffix')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schoolFees.terms.map((term, i) => {
                const termKey = `term${i + 1}` as 'term1' | 'term2' | 'term3';
                return (
                  <tr key={term.name}>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {locale === 'nl' ? term.nameNl : term.name}
                    </td>
                    <td className="px-6 py-4 text-center text-muted">
                      {term.weeks}
                    </td>
                    {MORNING_KEYS.map((n) => (
                      <td key={n} className="px-6 py-4 text-center font-semibold text-secondary">
                        {formatCurrency(schoolFees.toddler.mornings[n][termKey])}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="bg-secondary/5">
                <td className="px-6 py-4 text-foreground font-bold">
                  {locale === 'nl' ? 'Jaartotaal' : 'Annual Total'}
                </td>
                <td className="px-6 py-4 text-center text-muted font-medium">37</td>
                {MORNING_KEYS.map((n) => (
                  <td key={n} className="px-6 py-4 text-center font-bold text-foreground text-lg">
                    {formatCurrency(schoolFees.toddler.mornings[n].annual)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-6 space-y-2 bg-surface/50">
          {[0, 1, 2, 3].map((i) => (
            <p key={i} className="text-sm text-muted">
              • {tToddler(`notes.${i}`)}
            </p>
          ))}
        </div>
      </div>

      {/* Tariff 1 Table (Basisschool) */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h3 className="text-xl font-bold text-white">
            {locale === 'nl' ? 'Basisschool — Tariefgroep 1' : 'Primary School — Tariff Group 1'}
          </h3>
          <p className="text-white/80 text-sm">
            {locale === 'nl' ? 'Werkgever betaalt 75% of meer' : 'Employer pays 75% or more'}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Trimester' : 'Term'}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Weken' : 'Weeks'}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Groep 1 en 2' : 'Group 1 and 2'}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                  {locale === 'nl' ? 'Groep 3 t/m 8' : 'Group 3 to 8'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schoolFees.terms.map((term, i) => {
                const termKey = `term${i + 1}` as 'term1' | 'term2' | 'term3';
                return (
                  <tr key={term.name}>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {locale === 'nl' ? term.nameNl : term.name}
                    </td>
                    <td className="px-6 py-4 text-center text-muted">
                      {term.weeks}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-primary">
                      {formatCurrency(schoolFees.programs[0].tariefgroep1.group12[termKey])}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-primary">
                      {formatCurrency(schoolFees.programs[0].tariefgroep1.group38[termKey])}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-primary/5">
                <td className="px-6 py-4 text-foreground font-bold">
                  {locale === 'nl' ? 'Jaartotaal' : 'Annual Total'}
                </td>
                <td className="px-6 py-4 text-center text-muted font-medium">37</td>
                <td className="px-6 py-4 text-center font-bold text-foreground text-lg">
                  {formatCurrency(schoolFees.programs[0].tariefgroep1.group12.annual)}
                </td>
                <td className="px-6 py-4 text-center font-bold text-foreground text-lg">
                  {formatCurrency(schoolFees.programs[0].tariefgroep1.group38.annual)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tariff 2 Tables (Basisschool) */}
      {(['child1', 'child2', 'child3'] as const).map((childKey, childIndex) => (
        <div key={childKey} className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="bg-accent px-6 py-4">
            <h3 className="text-xl font-bold text-white">
              {locale === 'nl' ? `Basisschool — Tariefgroep 2 - Kind ${childIndex + 1}${childIndex === 2 ? '+' : ''}` : `Primary School — Tariff Group 2 - Child ${childIndex + 1}${childIndex === 2 ? '+' : ''}`}
            </h3>
            <p className="text-white/80 text-sm">
              {locale === 'nl' ? 'Werkgever betaalt minder dan 75%' : 'Employer pays less than 75%'}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    {locale === 'nl' ? 'Trimester' : 'Term'}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    {locale === 'nl' ? 'Weken' : 'Weeks'}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    {locale === 'nl' ? 'Groep 1 en 2' : 'Group 1 and 2'}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">
                    {locale === 'nl' ? 'Groep 3 t/m 8' : 'Group 3 to 8'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schoolFees.terms.map((term, i) => {
                  const termKey = `term${i + 1}` as 'term1' | 'term2' | 'term3';
                  return (
                    <tr key={term.name}>
                      <td className="px-6 py-4 text-foreground font-medium">
                        {locale === 'nl' ? term.nameNl : term.name}
                      </td>
                      <td className="px-6 py-4 text-center text-muted">
                        {term.weeks}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-accent">
                        {formatCurrency(schoolFees.programs[0].tariefgroep2[childKey].group12[termKey])}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-accent">
                        {formatCurrency(schoolFees.programs[0].tariefgroep2[childKey].group38[termKey])}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-accent/5">
                  <td className="px-6 py-4 text-foreground font-bold">
                    {locale === 'nl' ? 'Jaartotaal' : 'Annual Total'}
                  </td>
                  <td className="px-6 py-4 text-center text-muted font-medium">37</td>
                  <td className="px-6 py-4 text-center font-bold text-foreground text-lg">
                    {formatCurrency(schoolFees.programs[0].tariefgroep2[childKey].group12.annual)}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-foreground text-lg">
                    {formatCurrency(schoolFees.programs[0].tariefgroep2[childKey].group38.annual)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Notes */}
      <div className="bg-surface rounded-2xl p-6 space-y-3">
        <p className="text-sm text-muted">
          * {locale === 'nl' ? schoolFees.notes.reviewNl : schoolFees.notes.review}
        </p>
        <p className="text-sm text-muted">
          ** {locale === 'nl' ? schoolFees.notes.depositNl : schoolFees.notes.deposit}
        </p>
      </div>

      {/* School Year */}
      <p className="text-center text-sm text-muted">
        {t('schoolYear')} {schoolFees.schoolYear}
      </p>
    </div>
  );
}
