# FeatureTracker

A modern feature request management system built on Frappe Framework. This app provides a beautiful Kanban-style interface for tracking and managing feature requests with workflow integration.

## Quick video summary

https://github.com/user-attachments/assets/70c0744f-a33a-4781-99c0-6ce1308f00fd


## Features

### 🎯 **Feature Request Management**
- **Create, view, and manage** feature requests with a modern interface
- **Priority levels** (High, Medium, Low) with color-coded indicators
- **Detailed descriptions** and date tracking
- **Workflow integration** with 6 different states
- **Automatic Assignment** using load balance algorithm
- **System Push Notification** on closing the features

### 🎨 **Beautiful Dark Theme UI**
- **Modern Kanban board** with 3x2 grid layout
- **Dark theme** with professional gradients and shadows
- **Responsive design** that works on all devices
- **Smooth animations** and hover effects

### 📊 **Workflow States**
- **Open** - New feature requests
- **Under Review** - Features being evaluated
- **In Progress** - Features being developed
- **On Hold** - Temporarily paused features
- **Closed** - Completed features
- **Rejected** - Declined features

### 🔄 **Workflow Integration**
- **Standard Frappe workflow** system integration
- **Dynamic action buttons** based on current state
- **Real-time status updates** with automatic page refresh
- **Proper workflow transitions** using Frappe endpoints

### 🎛️ **User Interface**
- **Sidebar navigation** with dashboards and tools
- **Search functionality** to filter features
- **Drag-and-drop ready** interface (easily extensible)
- **Professional modals** for creating and viewing features

## Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/omarrtarek29/featuretracker.git
bench install-app featuretracker
```

## Usage

### Accessing the Feature Requests Page
1. Navigate to `/app/feature-requests` in your Frappe application
2. View the beautiful Kanban board with all 6 workflow states
3. Click on feature cards to view details and apply workflow actions
4. Use the "+ Feature Request" button to create new features

### Creating Feature Requests
1. Click the "+ Feature Request" button
2. Fill in the title, description, priority, and date
3. Click "Save" to create the feature request
4. The feature will appear in the "Open" column

### Managing Feature States
1. Click on any feature card to open the details modal
2. View all feature information in a clean, read-only format
3. Use the workflow action buttons to change the feature state
4. The page will automatically refresh to show the updated state

## Technical Details

### Architecture
- **Frontend**: Modern JavaScript with jQuery and Frappe UI components
- **Backend**: Frappe Framework with custom DocTypes
- **Styling**: Custom CSS with dark theme and responsive design
- **Workflow**: Integrated with Frappe's workflow system

### Key Components
- **Feature Request DocType**: Core data model with workflow integration
- **Kanban Board**: 3x2 grid layout with scrolling
- **Modal Dialogs**: Professional create and view modals
- **Workflow Actions**: Dynamic buttons based on available transitions

### File Structure
```
featuretracker/
├── featuretracker/
│   ├── doctype/
│   │   └── feature_request/
│   │       ├── feature_request.json
│   │       └── feature_request.py
│   ├── page/
│   │   └── feature_requests/
│   │       ├── feature_requests.js
│   │       └── feature_requests.json
│   └── public/
│       └── css/
│           └── feature_requests.css
└── README.md
```

## Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/featuretracker
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

## Development

### Adding New Features
1. Create feature requests through the UI
2. Use workflow actions to manage state transitions
3. All changes are automatically reflected in the Kanban board

### Customizing the UI
- Modify `feature_requests.css` for styling changes
- Update `feature_requests.js` for functionality changes
- The dark theme can be customized in the CSS file

### Workflow Customization
- Workflow states and transitions are managed through Frappe's workflow system
- Add new states or modify transitions in the Frappe Desk
- The UI will automatically adapt to workflow changes

## CI

This app can use GitHub Actions for CI. The following workflows are configured:

- CI: Installs this app and runs unit tests on every push to `develop` branch.
- Linters: Runs [Frappe Semgrep Rules](https://github.com/frappe/semgrep-rules) and [pip-audit](https://pypi.org/project/pip-audit/) on every pull request.

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Frappe Framework
