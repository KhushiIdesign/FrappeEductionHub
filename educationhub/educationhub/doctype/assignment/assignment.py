# Copyright (c) 2025, EducationHub and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.exceptions import ValidationError


class Assignment(Document):
	def validate(self):
		
         enrollment_exists = frappe.get_value(
               "Student",
               {
                  "name": self.student,
                  "course": self.course,
                  "semester": self.semester
               },

               "name",
         )

         if not enrollment_exists:
               frappe.throw(("The student {0} is not enrolled in Course: {1} and Semester: {2}. Please select a valid data.")
                  .format(self.student, self.course, self.semester)
               )

     
