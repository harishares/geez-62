
# GenZ CLG WordPress Plugin

This WordPress plugin embeds the GenZ CLG React application within your WordPress site, combining the power of React with WordPress's content management capabilities.

## Features

- Seamless integration of React app within WordPress pages/posts
- Customizable shortcode parameters to control app display
- WordPress admin settings page for configuration
- Data passing between WordPress and React app
- Responsive design that works with WordPress themes

## Installation

1. Upload the plugin files to `/wp-content/plugins/genz-clg` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Configure the plugin settings under the 'GenZ CLG' menu
4. Use the shortcode `[genz_clg]` to embed the app in any page or post

## Shortcode Usage

The plugin provides a flexible shortcode to embed the React app:

- Basic usage: `[genz_clg]`
- Specify initial page: `[genz_clg page="dashboard"]`
- Set container height: `[genz_clg height="800px"]`
- Custom CSS class: `[genz_clg class="my-custom-class"]`

## Development Workflow

### Building the React App

1. Develop your React app as usual in your development environment
2. Build your React app: `npm run build`
3. Copy the build files to the plugin's `/build` directory
4. The plugin will automatically load the React app where the shortcode is placed

### WordPress Integration Points

The plugin provides several integration points with WordPress:

1. **WordPress Data**: Access WordPress data in your React components via the global `wpData` object:
   ```js
   // In your React component
   const wpData = window.wpData;
   console.log(wpData.userId); // Current user ID
   console.log(wpData.restUrl); // WordPress REST API URL
   ```

2. **REST API**: The plugin exposes custom endpoints for your React app to interact with WordPress

3. **Admin Settings**: Customize the plugin behavior through the WordPress admin settings page

## Customization

The plugin allows for extensive customization:

- Override default settings in the WordPress admin
- Style the container using WordPress theme CSS
- Add custom integration points between WordPress and React

## Troubleshooting

If the React app doesn't display properly:

1. Check browser console for JavaScript errors
2. Verify that the build files are correctly copied to the `/build` directory
3. Ensure your WordPress theme doesn't have CSS conflicts with the React app
4. Check that the shortcode is correctly placed in your page/post

## Support

For support or feature requests, please open an issue on our GitHub repository or contact our support team.
