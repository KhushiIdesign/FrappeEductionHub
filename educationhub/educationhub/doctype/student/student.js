// Copyright (c) 2025, EducationHub and contributors
// For license information, please see license.txt

frappe.ui.form.on("Student", {


    refresh: function(frm) {
        frm.add_custom_button(('Get Assignment Details'), function() {
            
            if (frm.is_new()) {
                frappe.msgprint(('Please save the Student record before fetching assignment details.'));
                return;
            }
            
            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'Assignment', 
                    filters: {
                        student: frm.doc.name                           
                    }, 
                    order_by: 'creation desc', 
                    
                },
                callback: function(response) {
                    if (response.message) {
                        const assignment = response.message;
                      
                        const dialog = new frappe.ui.Dialog({
                            title: 'Assignment Detail',
                            fields: [
                                {
                                    label: 'Student',
                                    fieldtype: 'Text',
                                    default: assignment.student,
                                    read_only: 1
                                },
                                {
                                    label: 'Course',
                                    fieldtype: 'Text',
                                    default: assignment.course,
                                    read_only: 1
                                },
                                {
                                    label: 'semester',
                                    fieldtype: 'Text',
                                    default: assignment.semester,
                                    read_only: 1
                                },
                                {
                                    label: 'assignment_detail',
                                    fieldtype: 'Text',
                                    default: assignment.assignment_detail,
                                    read_only: 1
                                }
                            ],
                            primary_action_label: 'Close',
                            primary_action: function() {
                                dialog.hide();
                            }
                        });
                        dialog.show();
                    } else {
                        frappe.msgprint(__('No assignments found for this student.'));
                    }
                }
            });
        });

       

       
    },

    course: function(frm){

            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'Course', 
                    name: frm.doc.course 
                },
                callback: function (response) {
                    if (response.message) {
                        const course = response.message;

                        frm.set_intro(''); 
                        if (course.no_of_seats === 0) {
                            frm.set_intro(('There are no seats available in this course. You are late!'));
                        } else if (course.no_of_seats > 0 && course.no_of_seats <= 5) {
                            frm.set_intro(('Only a few seats left in this course! Hurry up!'));
                        } else {
                            frm.set_intro(''); 
                        }
                    } 
                },
               
            });
        
        
    }


 

})




