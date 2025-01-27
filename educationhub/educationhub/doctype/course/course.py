# Copyright (c) 2025, EducationHub and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc



class Course(Document):
		pass
		
@frappe.whitelist()
def create_todo(target_doc=None):
			referenceType = frappe.flags.args.referenceType
			source_name = frappe.flags.args.source_name
			def set_hardCoded_values(source, target):
				_set_hardCoded_values(referenceType, source, target)
			try:
					target_doc = get_mapped_doc(
						referenceType,
						source_name,
						{
							referenceType: {
   							"doctype": "ToDo",
	  						"field_map":{
									"name": "reference_name",
									"doctype": "reference_type",
									
								},
							}
						},
						target_doc, 
						set_hardCoded_values
					)
		        

					return target_doc

			except Exception as exp:
					frappe.log_error(exp)

def _set_hardCoded_values(referenceType, source, target):
	target.description = f'''{source.get("total_fee")+ source.get("no_of_seats")} '''
	target.role = f'''{source.get("reference_name")+source.get("name1")} '''
	target.assigned_by = frappe.session.user


	if referenceType == 'Lead' and source.get('lead_owner') and frappe.db.exists('User', source.get('lead_owner')):
		target.allocated_to = source.get('lead_owner')
	elif referenceType == 'Sales Order' and source.get('sales_order_owner') and frappe.db.exists('User', source.get('sales_order_owner')):
		target.allocated_to = source.get('sales_order_owner')
	elif referenceType == 'Purchase Order' and source.get('purchase_requestor') and frappe.db.exists('User', source.get('purchase_requestor')):
		target.allocated_to = source.get('purchase_requestor')


