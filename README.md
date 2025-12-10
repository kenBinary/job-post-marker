# OLJ Tools Extension

A Chrome extension that enhances job browsing on OnlineJobs.ph and LinkedIn by automatically marking jobs as viewed and providing manual marking controls.

## Key Features

- **Auto-mark jobs as viewed** on OnlineJobs.ph and LinkedIn using viewport detection
- **Manual job marking** with click-based controls
- **Keyboard shortcuts** (Shift+E) to toggle auto-marking functionality
- **Persistent state management** across browser sessions
- **Visual indicators** for viewed and unviewed jobs

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Chrome browser (or Chromium-based browser)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd olj-tools-extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build:new
   ```

4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from the project directory

## Usage

1. Navigate to [OnlineJobs.ph](https://www.onlinejobs.ph/) or [LinkedIn Jobs](https://www.linkedin.com/jobs/)
2. The extension automatically adds marking buttons to job listings
3. Click the extension icon to access the popup interface
4. Use **Shift+E** to toggle auto-marking on/off
5. Jobs are automatically marked as viewed when scrolled into view (with auto-marking enabled)
6. Manually click "Mark As Viewed" buttons for instant marking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

## TODO

- [ ] add way to control observer config from popup
