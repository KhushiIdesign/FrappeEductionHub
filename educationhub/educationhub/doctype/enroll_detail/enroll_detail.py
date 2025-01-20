# Copyright (c) 2025, EducationHub and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class EnrollDetail(Document):
	def before_save(self):
		seats = frappe.db.get_value('Course',self.course_name,'no_of_seats')
		if seats is not None: 
			frappe.db.set_value('Course',self.course_name,'no_of_seats',(int(seats)-1))
		else:
			frappe.throw(f"Seats are full for the course {self.course_name} and the no of Seats are {self.no_of_seats}")
	
