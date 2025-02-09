import requests
from PIL import Image
import io
import os
from pathlib import Path

def process_image(image):
    # Convert to RGBA if not already
    if image.mode != 'RGBA':
        image = image.convert('RGBA')

    # Create white background
    background = Image.new('RGBA', image.size, (255, 255, 255, 255))

    # Composite the image onto the white background
    image = Image.alpha_composite(background, image)

    # Convert to grayscale while preserving alpha
    r, g, b, a = image.split()
    gray = Image.merge('L', (r,))  # Use red channel for grayscale
    return Image.merge('RGBA', (gray, gray, gray, a))

def create_placeholder(image):
    # Create a very small version for placeholder
    width = 32
    aspect = image.width / image.height
    height = int(width / aspect)
    return image.resize((width, height), Image.Resampling.LANCZOS)

def save_images(image, name, output_dir):
    # Ensure directory exists
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Save WebP version
    image.save(output_dir / f"{name}.webp", 'WEBP', quality=90)

    # Save PNG version
    image.save(output_dir / f"{name}.png", 'PNG')

    # Create and save placeholder
    placeholder = create_placeholder(image)
    placeholder.save(output_dir / f"{name}-placeholder.png", 'PNG')

def main():
    companies = [
        {
            'name': 'Rely',
            'logo_path': 'attached_assets/Rely.png'
        },
        {
            'name': 'Keep',
            'logo_path': 'attached_assets/Keep.png'
        },
        {
            'name': 'Margin',
            'logo_path': 'attached_assets/margin.png'
        }
    ]

    output_dir = 'public/assets/images/logos'

    for company in companies:
        print(f"Processing {company['name']}...")
        try:
            # Open and process local image
            image = Image.open(company['logo_path'])
            processed = process_image(image)
            save_images(processed, company['name'], output_dir)
            print(f"Successfully processed {company['name']}")
        except Exception as e:
            print(f"Failed to process {company['name']}: {e}")

if __name__ == "__main__":
    main()