import frappe


def after_install():
	roles = ["Feature User", "Feature Senior"]
	for role in roles:
		if not frappe.db.exists("Role", role):
			frappe.get_doc(
				{
					"doctype": "Role",
					"role_name": role,
					"desk_access": 1,
				}
			).insert()
