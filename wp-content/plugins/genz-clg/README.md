
# GenZ CLG WordPress Plugin

This WordPress plugin embeds the GenZ CLG React application.

## Installation

1. Upload the plugin files to `/wp-content/plugins/genz-clg`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the shortcode `[genz_clg]` to embed the app in any page

## Usage

- Basic usage: `[genz_clg]`
- Specify page: `[genz_clg page="dashboard"]`

## Development

1. Build your React app
2. Copy the build files to the `build` directory
3. The plugin will automatically load the React app where the shortcode is placed

## Integration Points

- The plugin provides WordPress data to your React app via the global `wpData` object
- Access REST API URL, nonce, and user ID from your React components
