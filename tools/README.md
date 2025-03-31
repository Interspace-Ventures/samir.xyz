# Development Tools & Scripts

This directory contains tools and scripts for the portfolio website development workflow.

## Scripts

### `organize-assets.sh`

Located in `tools/scripts/organize-assets.sh`, this script handles asset organization and normalization:

- **Purpose**: Ensures consistent image asset locations and naming conventions
- **When it runs**: Automatically executed during the `start.sh` startup process
- **What it does**:
  1. Creates necessary directories for assets
  2. Copies images from `attached_assets` to `public/attached_assets`
  3. Normalizes venture logos with consistent naming
  4. Places logos in `public/logos/ventures` with standardized filenames

### `check-ventures.sh`

Located in `tools/check-ventures.sh`, this script verifies venture data:

- **Purpose**: Ensures venture images and data are properly loaded
- **When to use**: Run manually for debugging venture data
- **What it does**: Checks for missing venture images and reports any issues

## Archived Scripts

The `tools/archive` directory contains previous scripts that have been preserved for reference but should not be used:

- `check-portfolio-styles.js` - Replaced by improved Tailwind configuration
- `test-grid-with-fetch.js` - No longer needed with current architecture
- `update-navbar-shadows.js` - Functionality now handled by proper CSS

## Best Practices

1. **Script Organization**: Keep all utility scripts in the `tools` directory
2. **Documentation**: Document purpose and usage for all scripts
3. **Maintenance**: Archive rather than delete scripts that might be useful for reference
4. **Automation**: Automate repetitive tasks through the startup process
5. **Error Handling**: Include proper error handling and logging in scripts

## Adding New Tools

When adding new tools:

1. Place them in the appropriate directory (`tools` or `tools/scripts`)
2. Document the tool's purpose and usage in this README
3. Make the script executable with `chmod +x <script-path>`
4. If needed, add execution to `start.sh` for automation