INSERT INTO appointments (
  patient_id, title, description, completed, physician, created_at, updated_at
) VALUES
(
  1, 'Initial Consultation', 'Discuss patient history and health concerns.', false, 'Dr. Miller', NOW(), NOW()
),
(
  1, 'Blood Test Review', 'Review blood test results and recommend next steps.', false, 'Dr. Miller', NOW(), NOW()
),
(
  2, 'Follow-up Visit', 'Review lab results and adjust medication.', true, 'Dr. Adams', NOW(), NOW()
),
(
  3, 'Annual Physical', 'Routine yearly checkup and vitals check.', false, 'Dr. Patel', NOW(), NOW()
),
(
  4, 'Diabetes Management', 'Check blood sugar logs and adjust insulin dosage.', false, 'Dr. Gonzales', NOW(), NOW()
),
(
  4, 'Eye Exam Referral', 'Discuss referral to ophthalmologist for diabetic eye check.', false, 'Dr. Gonzales', NOW(), NOW()
),
(
  5, 'Post-Move Evaluation', 'Evaluate health after relocation. Update records.', false, 'Dr. Kim', NOW(), NOW()
);
