frappe.pages["feature-requests"].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "Feature Requests",
		single_column: true,
	});
	$(".page-head").hide();

	// Load the CSS file
	frappe.require("/assets/featuretracker/css/feature_requests.css");

	// Create the page structure
	const pageContent = $(`
		<div class="feature-requests-page">
			<div class="main-container">
				<div class="sidebar">
					<div class="sidebar-header">
						<span>☰</span>
						<span>Feature Requests</span>
					</div>
					<div class="sidebar-section">
						<div class="section-title">Dashboards</div>
						<div class="sidebar-item">
							<span class="sidebar-icon">❤️</span>
							<span>Operation</span>
						</div>
						<div class="sidebar-item active">
							<span class="sidebar-icon">❤️</span>
							<span>Finance</span>
						</div>
					</div>
					<div class="sidebar-section">
						<div class="section-title">Tools</div>
						<div class="sidebar-item">
							<span class="sidebar-icon">❤️</span>
							<span>Notes</span>
						</div>
						<div class="sidebar-item">
							<span class="sidebar-icon">❤️</span>
							<span>Notes</span>
						</div>
					</div>
				</div>
				<div class="content-area">
					<div class="roadmap-header">
						<div>
							<div class="roadmap-title">Roadmap</div>
							<div class="roadmap-subtitle">Last synced 1 minute ago</div>
						</div>
						<div class="header-actions">
							<button class="btn-add-feature">+ Feature Request</button>
						</div>
					</div>
					<div class="kanban-board">
						<div class="kanban-grid">
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">Open</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="Open">
									<!-- Cards will be loaded here -->
								</div>
							</div>
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">Under Review</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="Under Review">
									<!-- Cards will be loaded here -->
								</div>
							</div>
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">In Progress</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="In Progress">
									<!-- Cards will be loaded here -->
								</div>
							</div>
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">On Hold</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="On Hold">
									<!-- Cards will be loaded here -->
								</div>
							</div>
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">Closed</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="Closed">
									<!-- Cards will be loaded here -->
								</div>
							</div>
							<div class="kanban-column">
								<div class="column-header">
									<div>
										<div class="column-title">Rejected</div>
										<div class="column-count">0</div>
									</div>
									<button class="sort-button">
										Deadline ↕️
									</button>
								</div>
								<div class="column-subtitle">Total Features</div>
								<div class="kanban-cards" data-status="Rejected">
									<!-- Cards will be loaded here -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	page.wrapper.append(pageContent);

	// Initialize the page
	initFeatureRequestsPage(page);
};

function initFeatureRequestsPage(page) {
	// Load feature requests
	loadFeatureRequests();

	// Setup event listeners
	setupEventListeners();
}

function loadFeatureRequests() {
	frappe.call({
		method: "frappe.client.get_list",
		args: {
			doctype: "Feature Request",
			fields: ["name", "title", "description", "priority", "date", "workflow_state"],
			limit: 100,
		},
		callback: function (r) {
			if (r.message) {
				renderFeatureCards(r.message);
			}
		},
	});
}

function renderFeatureCards(features) {
	// Clear existing cards
	$(".kanban-cards").empty();

	// Group features by workflow state
	const groupedFeatures = {
		Open: [],
		"Under Review": [],
		"In Progress": [],
		"On Hold": [],
		Closed: [],
		Rejected: [],
	};

	features.forEach((feature) => {
		const status = feature.workflow_state || "Open";
		if (groupedFeatures[status]) {
			groupedFeatures[status].push(feature);
		}
	});

	// Render cards for each column
	renderColumnCards("Open", groupedFeatures["Open"]);
	renderColumnCards("Under Review", groupedFeatures["Under Review"]);
	renderColumnCards("In Progress", groupedFeatures["In Progress"]);
	renderColumnCards("On Hold", groupedFeatures["On Hold"]);
	renderColumnCards("Closed", groupedFeatures["Closed"]);
	renderColumnCards("Rejected", groupedFeatures["Rejected"]);

	// Update counts
	updateColumnCounts();
}

function renderColumnCards(status, features) {
	const column = $(`.kanban-cards[data-status="${status}"]`);

	features.forEach((feature) => {
		const card = createFeatureCard(feature);
		column.append(card);
	});
}

function createFeatureCard(feature) {
	const priorityIcon = getPriorityIcon(feature.priority);

	return $(`
		<div class="feature-card" data-feature-id="${feature.name}">
			<div class="card-header">
				<span class="priority-icon">${priorityIcon}</span>
				<span class="feature-number">${feature.name}</span>
			</div>
			<div class="feature-title">${feature.title}</div>
		</div>
	`);
}

function getPriorityIcon(priority) {
	switch (priority) {
		case "High":
			return "🔴";
		case "Medium":
			return "🟡";
		case "Low":
			return "🟢";
		default:
			return "🟡";
	}
}

function updateColumnCounts() {
	$(".kanban-column").each(function () {
		const column = $(this);
		const cards = column.find(".feature-card").length;
		column.find(".column-count").text(cards);
	});
}

function setupEventListeners() {
	// Add feature request button
	$(".btn-add-feature").on("click", function () {
		showCreateFeaturePopup();
	});

	// Card click to open feature details
	$(document).on("click", ".feature-card", function () {
		const featureId = $(this).data("feature-id");
		showFeatureDetailsPopup(featureId);
	});
}

function showCreateFeaturePopup() {
	const dialog = new frappe.ui.Dialog({
		title: "Create New Feature Request",
		fields: [
			{
				fieldname: "title",
				label: "Title",
				fieldtype: "Data",
				reqd: 1,
				placeholder: "Enter feature title",
			},
			{
				fieldname: "description",
				label: "Description",
				fieldtype: "Long Text",
				reqd: 1,
				placeholder: "Describe the feature in detail",
			},
			{
				fieldname: "priority",
				label: "Priority",
				fieldtype: "Select",
				options: "High\nMedium\nLow",
				default: "Medium",
			},
			{
				fieldname: "date",
				label: "Date",
				fieldtype: "Date",
				default: frappe.datetime.get_today(),
			},
		],
		primary_action_label: "Save",
		primary_action(values) {
			createFeatureRequest(values);
			dialog.hide();
		},
	});

	dialog.show();
}

function showFeatureDetailsPopup(featureId) {
	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Feature Request",
			name: featureId,
		},
		callback: function (r) {
			if (r.message) {
				const feature = r.message;

				// Get available workflow transitions
				frappe.call({
					method: "frappe.model.workflow.get_transitions",
					args: {
						doc: feature,
					},
					callback: function (transition) {
						const transitions = transition.message || [];

						const dialog = new frappe.ui.Dialog({
							title: `Feature: ${feature.title}`,
							fields: [
								{
									fieldname: "title",
									label: "Title",
									fieldtype: "Data",
									default: feature.title,
									read_only: 1,
								},
								{
									fieldname: "description",
									label: "Description",
									fieldtype: "Long Text",
									default: feature.description,
									read_only: 1,
								},
								{
									fieldname: "priority",
									label: "Priority",
									fieldtype: "Select",
									options: "High\nMedium\nLow",
									default: feature.priority,
									read_only: 1,
								},
								{
									fieldname: "date",
									label: "Date",
									fieldtype: "Date",
									default: feature.date,
									read_only: 1,
								},
								{
									fieldname: "current_status",
									label: "Current Status",
									fieldtype: "Data",
									default: feature.workflow_state || "Open",
									read_only: 1,
								},
							],
							primary_action_label: "Close",
							primary_action(values) {
								dialog.hide();
							},
						});

						// Show dialog first
						dialog.show();

						// Add workflow action buttons after dialog is rendered
						setTimeout(() => {
							if (transitions.length > 0) {
								const workflowSection = $(`
									<div class="workflow-actions-section">
										<label class="control-label">Workflow Actions</label>
										<div class="workflow-buttons">
											${transitions
												.map(
													(transition) => `
												<button class="btn btn-workflow-action" data-action="${transition.action}">
													${transition.action}
												</button>
											`
												)
												.join("")}
										</div>
									</div>
								`);

								// Find the last field and add workflow section after it
								const lastField = dialog.wrapper.find(".form-group").last();
								lastField.after(workflowSection);

								// Add event listeners for workflow action buttons
								dialog.wrapper
									.find(".btn-workflow-action")
									.on("click", function () {
										const action = $(this).data("action");
										applyWorkflowAction(feature, action);
										dialog.hide();
									});
							}
						}, 100);
					},
				});
			}
		},
	});
}

function createFeatureRequest(values) {
	frappe.call({
		method: "frappe.client.insert",
		args: {
			doc: {
				doctype: "Feature Request",
				title: values.title,
				description: values.description,
				priority: values.priority,
				date: values.date,
				workflow_state: "Open",
			},
		},
		callback: function (r) {
			if (r.message) {
				frappe.msgprint("Feature Request created successfully!");
				loadFeatureRequests(); // Reload to show new feature
			} else {
				frappe.msgprint("Error creating feature request");
			}
		},
	});
}

function applyWorkflowAction(feature, action) {
	frappe.call({
		method: "frappe.model.workflow.apply_workflow",
		args: {
			doc: feature,
			action: action,
		},
		callback: function (r) {
			if (r.exc) {
				frappe.msgprint("Error applying workflow action");
			} else {
				frappe.msgprint("Workflow action applied successfully!");
				// Reload the page to reflect changes
				loadFeatureRequests();
			}
		},
	});
}
