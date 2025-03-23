# Hey - I'm Samir

I drive business impact at fintechs.

## Technology Stack

- **Next.js 15.2.3**: Server-side rendering and client-side hydration
- **React 19**: Dynamic user interface components
- **Bun Runtime**: Fast JavaScript/TypeScript runtime (critical for this project)
- **Tailwind CSS**: Responsive styling
- **TypeScript**: Type-safe development

## AI COLLABORATION GUIDELINES

### Communication Guidelines

1. **Use Simple Language** - Always communicate in non-technical terms. Avoid code jargon when explaining changes or recommendations.

2. **Focus on Visual Feedback** - When implementing UI changes, describe the visual impact in clear terms and offer to show a preview using the appropriate tool.

3. **Respond in User's Language** - If the user communicates in a language other than English, respond in the same language.

4. **Single Question Principle** - Ask only one question at a time to avoid overwhelming the user.

5. **Show Progress** - Regularly summarize what has been accomplished and what's next using simple checkmarks (✓) for completed items and arrows (→) for in-progress work.

### Task Execution Guidelines

1. **Error Handling** - When encountering errors, analyze logs and provide a simple explanation of the issue before suggesting solutions.

2. **Test All Changes** - Always verify that changes work properly across different viewport sizes and in both light and dark modes.

3. **Step-by-Step Approach** - Break down complex tasks into smaller steps and confirm completion of each step before moving to the next.

4. **Prefer Workflow Tools** - Use the workflow system for running the application rather than executing commands directly in the terminal.

5. **Maintain Version Tracking** - Update version numbers in:
   - `version.json`
   - Footer component (`src/components/footer.tsx`)
   - CHANGELOG.md

## IMPORTANT DEVELOPMENT GUIDELINES

### Collaboration Guidelines

1. **ASK BEFORE DELETING FILES** - Never delete or replace files in the public directory, especially images, without explicit permission.

2. **Handle One Task at a Time** - Focus on implementing one feature or fixing one issue at a time, and get approval before moving to the next task.

3. **Confirm Major Changes** - Always get explicit approval before:
   - Changing technologies or approaches
   - Modifying existing functional components
   - Adding new dependencies
   - Restructuring the application

4. **Keep User in the Loop** - Regularly communicate about progress and challenges rather than making independent decisions.

### Critical Configuration Requirements

1. **Always use Bun runtime** - This project must use Bun instead of Node.js for proper hydration in the Replit environment.

2. **Source Map Management** - Source maps must be disabled to prevent client-side hydration errors.
   - This is handled in both `next.config.js` and environment variables in `start.sh`

3. **Hydration Safety** - The application uses `ClientWrapper` components to safely handle client-side hydration.

4. **Turbopack Configuration** - Special configuration in `next.config.js` ensures compatibility with Replit.

### Avoiding Common Issues

To prevent the hydration and infinite loading issues from recurring:

1. **DO NOT** modify environment variables in `start.sh` that control the runtime (keep using Bun)
2. **DO NOT** enable source maps or source map related features
3. **DO NOT** change the `ClientWrapper` implementation which safely handles hydration
4. **DO NOT** modify the webpack configuration that disables source maps
5. **DO NOT** replace PNG image files with SVGs or other formats without explicit permission

## Assets Management

- Original image files in `/public/ventures-brands` are PNG format with blue-to-purple gradients
- Do not convert these files to SVG or other formats
- Always ask before modifying any assets in the public directory

## Running the Application

The application is configured to run automatically through the "Start application" workflow, which executes `./start.sh`.

```bash
# View application version
cat version.json

# Manual start (if needed)
./start.sh
```

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

## Troubleshooting

If you encounter any issues:

1. Check the logs for source map or webpack related errors
2. Ensure Bun is being used as the runtime
3. Clear cache files with `rm -rf .next` and `rm -rf node_modules/.cache`
4. Restart the application with the workflow