import frappe

def execute():
    frappe.db.sql(""" ALTER TABLE `tabCourse` MODIFY current BIGINT """)
        