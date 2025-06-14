INSERT INTO patients (
  first_name, last_name, email, phone, address1, address2, city, state, zip, notes, active, created_at, updated_at
) VALUES
(
  'John', 'Doe', 'john.doe@example.com', '555-123-4567',
  '123 Maple Street', NULL, 'Columbus', 'OH', '43210',
  'Allergic to penicillin.', TRUE, NOW(), NOW()
),
(
  'Jane', 'Smith', 'jane.smith@example.com', '555-234-5678',
  '456 Oak Avenue', 'Apt 2B', 'Cleveland', 'OH', '44114',
  'Prefers morning appointments.', TRUE, NOW(), NOW()
),
(
  'Raj', 'Patel', 'raj.patel@example.com', '555-345-6789',
  '789 Pine Lane', NULL, 'Dayton', 'OH', '45402',
  '', TRUE, NOW(), NOW()
),
(
  'Maria', 'Gonzalez', 'maria.g@example.com', '555-456-7890',
  '1010 Elm Street', 'Suite 300', 'Toledo', 'OH', '43604',
  'Diabetic. Needs regular checkups.', TRUE, NOW(), NOW()
),
(
  'Alex', 'Chen', 'alex.chen@example.com', '555-567-8901',
  '222 Birch Blvd', NULL, 'Cincinnati', 'OH', '45202',
  'Moved recently from California.', TRUE, NOW(), NOW()
);
