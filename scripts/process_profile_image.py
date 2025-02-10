import os
from PIL import Image
from pathlib import Path

def process_image(image):
    # Convert to RGBA if not already
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create white background
    background = Image.new('RGBA', image.size, (255, 255, 255, 255))
    
    # Composite the image onto the white background
    return Image.alpha_composite(background, image)

def create_placeholder(image):
    # Create a very small version for placeholder
    width = 64  # Slightly larger for profile photo
    aspect = image.width / image.height
    height = int(width / aspect)
    return image.resize((width, height), Image.Resampling.LANCZOS)

def save_images(image, output_dir):
    # Ensure directory exists
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Save WebP version
    image.save(output_dir / "samir-profile-photo.webp", 'WEBP', quality=90)
    
    # Save PNG version
    image.save(output_dir / "samir-profile-photo.png", 'PNG')
    
    # Create and save placeholder
    placeholder = create_placeholder(image)
    placeholder.save(output_dir / "samir-profile-photo-placeholder.png", 'PNG')

def main():
    input_path = 'public/assets/images/profile/samir-profile-photo.jpg'
    output_dir = 'public/assets/images/profile'
    
    try:
        # Open and process image
        image = Image.open(input_path)
        processed = process_image(image)
        save_images(processed, output_dir)
        print("Successfully processed profile image")
    except Exception as e:
        print(f"Failed to process profile image: {e}")

if __name__ == "__main__":
    main()
