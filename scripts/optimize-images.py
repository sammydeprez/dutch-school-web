#!/usr/bin/env python3
"""
Image Optimization Script for Dutch School Nairobi Website

This script optimizes images by:
- Resizing to appropriate dimensions
- Compressing JPEG/PNG files
- Generating WebP versions for modern browsers
- Preserving originals in a backup folder

Usage:
    python scripts/optimize-images.py [--input-dir DIR] [--quality QUALITY] [--no-webp] [--dry-run]

Requirements:
    pip install Pillow

Author: Dutch School Nairobi
"""

import os
import sys
import argparse
import shutil
from pathlib import Path
from datetime import datetime

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install it with: pip install Pillow")
    sys.exit(1)


# Configuration for different image types based on their path/name
IMAGE_CONFIGS = {
    # Hero images - larger for full-width display
    'hero': {'max_width': 1200, 'max_height': 900, 'quality': 80},

    # Program images
    'programs': {'max_width': 800, 'max_height': 600, 'quality': 80},
    'toddler': {'max_width': 800, 'max_height': 600, 'quality': 80},
    'primary': {'max_width': 800, 'max_height': 600, 'quality': 80},
    'ntc': {'max_width': 800, 'max_height': 600, 'quality': 80},
    'adult': {'max_width': 800, 'max_height': 600, 'quality': 80},

    # Square images
    'community': {'max_width': 800, 'max_height': 800, 'quality': 80},
    'activities': {'max_width': 800, 'max_height': 800, 'quality': 80},

    # Team/testimonial headshots - smaller
    'team': {'max_width': 400, 'max_height': 400, 'quality': 85},
    'testimonial': {'max_width': 200, 'max_height': 200, 'quality': 85},

    # Map image - wide format
    'map': {'max_width': 1400, 'max_height': 600, 'quality': 80},

    # Logo - keep quality high
    'logo': {'max_width': 500, 'max_height': 500, 'quality': 90},

    # Default for unmatched images
    'default': {'max_width': 1200, 'max_height': 1200, 'quality': 80},
}


def get_config_for_image(filepath: Path) -> dict:
    """Determine the appropriate config based on file path/name."""
    filepath_lower = str(filepath).lower()
    filename_lower = filepath.stem.lower()

    for key, config in IMAGE_CONFIGS.items():
        if key in filepath_lower or key in filename_lower:
            return config

    return IMAGE_CONFIGS['default']


def get_file_size_str(size_bytes: int) -> str:
    """Convert bytes to human-readable string."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"


def optimize_image(
    input_path: Path,
    output_path: Path,
    max_width: int,
    max_height: int,
    quality: int,
    create_webp: bool = True,
    dry_run: bool = False
) -> dict:
    """
    Optimize a single image.

    Returns a dict with optimization results.
    """
    results = {
        'input_path': str(input_path),
        'output_path': str(output_path),
        'original_size': input_path.stat().st_size,
        'new_size': 0,
        'webp_size': 0,
        'original_dimensions': None,
        'new_dimensions': None,
        'skipped': False,
        'error': None,
    }

    try:
        with Image.open(input_path) as img:
            results['original_dimensions'] = img.size

            # Convert RGBA to RGB for JPEG (remove alpha channel)
            if img.mode == 'RGBA' and output_path.suffix.lower() in ['.jpg', '.jpeg']:
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])  # Use alpha as mask
                img = background
            elif img.mode == 'RGBA':
                pass  # Keep RGBA for PNG
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            # Calculate new dimensions maintaining aspect ratio
            width, height = img.size

            # Only resize if image is larger than max dimensions
            if width > max_width or height > max_height:
                ratio = min(max_width / width, max_height / height)
                new_width = int(width * ratio)
                new_height = int(height * ratio)

                # Use high-quality downsampling
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            results['new_dimensions'] = img.size

            if dry_run:
                results['skipped'] = True
                return results

            # Ensure output directory exists
            output_path.parent.mkdir(parents=True, exist_ok=True)

            # Save optimized image
            save_kwargs = {'quality': quality, 'optimize': True}

            if output_path.suffix.lower() == '.png':
                # PNG doesn't use quality, use optimize and compress_level
                save_kwargs = {'optimize': True, 'compress_level': 9}
            elif output_path.suffix.lower() in ['.jpg', '.jpeg']:
                # Add progressive JPEG for better perceived loading
                save_kwargs['progressive'] = True

            img.save(output_path, **save_kwargs)
            results['new_size'] = output_path.stat().st_size

            # Create WebP version
            if create_webp:
                webp_path = output_path.with_suffix('.webp')
                img.save(webp_path, 'WEBP', quality=quality, method=6)
                results['webp_size'] = webp_path.stat().st_size
                results['webp_path'] = str(webp_path)

    except Exception as e:
        results['error'] = str(e)

    return results


def find_images(directory: Path, extensions: tuple = ('.jpg', '.jpeg', '.png', '.gif', '.webp')) -> list:
    """Find all image files in directory recursively."""
    images = []
    for ext in extensions:
        images.extend(directory.rglob(f'*{ext}'))
        images.extend(directory.rglob(f'*{ext.upper()}'))
    return sorted(set(images))


def backup_originals(images: list, backup_dir: Path, dry_run: bool = False) -> None:
    """Backup original images before optimization."""
    if dry_run:
        print(f"\n[DRY RUN] Would backup {len(images)} images to {backup_dir}")
        return

    backup_dir.mkdir(parents=True, exist_ok=True)

    for img_path in images:
        relative_path = img_path.relative_to(img_path.parents[len(img_path.parents)-2])
        backup_path = backup_dir / relative_path
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(img_path, backup_path)

    print(f"\nBacked up {len(images)} original images to {backup_dir}")


def main():
    parser = argparse.ArgumentParser(
        description='Optimize images for the Dutch School Nairobi website',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    # Optimize all images in public folder
    python scripts/optimize-images.py

    # Dry run to see what would happen
    python scripts/optimize-images.py --dry-run

    # Custom quality setting
    python scripts/optimize-images.py --quality 75

    # Skip WebP generation
    python scripts/optimize-images.py --no-webp

    # Optimize specific directory
    python scripts/optimize-images.py --input-dir public/images
        """
    )

    parser.add_argument(
        '--input-dir', '-i',
        type=str,
        default='public',
        help='Input directory containing images (default: public)'
    )

    parser.add_argument(
        '--quality', '-q',
        type=int,
        default=None,
        help='Override quality setting for all images (1-100)'
    )

    parser.add_argument(
        '--no-webp',
        action='store_true',
        help='Skip WebP generation'
    )

    parser.add_argument(
        '--no-backup',
        action='store_true',
        help='Skip backing up original images'
    )

    parser.add_argument(
        '--dry-run', '-n',
        action='store_true',
        help='Show what would be done without making changes'
    )

    args = parser.parse_args()

    # Determine project root (script is in scripts/ folder)
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    input_dir = project_root / args.input_dir

    if not input_dir.exists():
        print(f"Error: Input directory not found: {input_dir}")
        sys.exit(1)

    # Find all images
    images = find_images(input_dir)

    if not images:
        print(f"No images found in {input_dir}")
        sys.exit(0)

    print(f"\nDutch School Nairobi - Image Optimizer")
    print("=" * 50)
    print(f"Input directory: {input_dir}")
    print(f"Images found: {len(images)}")
    print(f"WebP generation: {'disabled' if args.no_webp else 'enabled'}")
    print(f"Mode: {'DRY RUN' if args.dry_run else 'LIVE'}")

    # Backup originals
    if not args.no_backup and not args.dry_run:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_dir = project_root / f'backups/images_{timestamp}'
        backup_originals(images, backup_dir, args.dry_run)

    # Process images
    print(f"\nProcessing images...")
    print("-" * 50)

    total_original = 0
    total_optimized = 0
    total_webp = 0
    errors = []

    for img_path in images:
        # Skip already-optimized WebP files if we're creating new ones
        if img_path.suffix.lower() == '.webp' and not args.no_webp:
            continue

        config = get_config_for_image(img_path)

        # Override quality if specified
        if args.quality:
            config['quality'] = args.quality

        result = optimize_image(
            input_path=img_path,
            output_path=img_path,  # Overwrite original
            max_width=config['max_width'],
            max_height=config['max_height'],
            quality=config['quality'],
            create_webp=not args.no_webp,
            dry_run=args.dry_run
        )

        if result['error']:
            errors.append(result)
            print(f"  ERROR: {img_path.name} - {result['error']}")
            continue

        # Calculate savings
        original_size = result['original_size']
        new_size = result['new_size'] if not args.dry_run else original_size
        webp_size = result.get('webp_size', 0)

        total_original += original_size
        total_optimized += new_size
        total_webp += webp_size

        # Print result
        if args.dry_run:
            print(f"  {img_path.name}")
            print(f"    Current: {get_file_size_str(original_size)}, {result['original_dimensions']}")
            print(f"    Config: max {config['max_width']}x{config['max_height']}, quality {config['quality']}")
        else:
            savings = ((original_size - new_size) / original_size * 100) if original_size > 0 else 0
            dim_change = f"{result['original_dimensions']} → {result['new_dimensions']}"

            print(f"  {img_path.name}")
            print(f"    {get_file_size_str(original_size)} → {get_file_size_str(new_size)} ({savings:.1f}% saved)")
            print(f"    Dimensions: {dim_change}")

            if webp_size > 0:
                webp_savings = ((original_size - webp_size) / original_size * 100)
                print(f"    WebP: {get_file_size_str(webp_size)} ({webp_savings:.1f}% saved)")

    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)

    if args.dry_run:
        print(f"Total images to process: {len(images)}")
        print(f"Current total size: {get_file_size_str(total_original)}")
        print("\nRun without --dry-run to apply optimizations.")
    else:
        total_savings = total_original - total_optimized
        savings_percent = (total_savings / total_original * 100) if total_original > 0 else 0

        print(f"Images processed: {len(images) - len(errors)}")
        print(f"Original total: {get_file_size_str(total_original)}")
        print(f"Optimized total: {get_file_size_str(total_optimized)}")
        print(f"Space saved: {get_file_size_str(total_savings)} ({savings_percent:.1f}%)")

        if total_webp > 0:
            webp_savings = ((total_original - total_webp) / total_original * 100)
            print(f"WebP total: {get_file_size_str(total_webp)} ({webp_savings:.1f}% vs original)")

    if errors:
        print(f"\nErrors: {len(errors)} images failed to process")
        for err in errors:
            print(f"  - {err['input_path']}: {err['error']}")

    print()


if __name__ == '__main__':
    main()
