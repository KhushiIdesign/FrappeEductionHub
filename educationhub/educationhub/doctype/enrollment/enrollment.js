// Copyright (c) 2025, EducationHub and contributors
// For license information, please see license.txt

frappe.ui.form.on("Enrollment", {
	refresh(frm) {
        
        frm.set_query("student", function() {
            return {
                // query: "my_app.my_module.my_custom_query",
                filters: {
                    'student': frm.doc.student, 
                    'course': frm.doc.course,
                    'semester': frm.doc.semester
                }
            };
        });

	},
});
