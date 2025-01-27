// Copyright (c) 2025, EducationHub and contributors
// For license information, please see license.txt

frappe.ui.form.on("Course", {
	setup: function (frm) {
        frm.make_methods = {
            ToDo: () =>
                frappe.model.open_mapped_doc({
                    method: "educationhub.educationhub.doctype.course.course.create_todo",
                    args: {
                        referenceType: 'Course',
                        source_name: frm.doc.name,
                    }
                }),
            }

        },
});
