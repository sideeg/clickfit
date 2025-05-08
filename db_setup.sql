

-- Drop table if it exists
DROP TABLE IF EXISTS `users`;

-- Create users table
CREATE TABLE `users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `password` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `type` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `active` TINYINT DEFAULT 1 COMMENT '1 for active, 0 for inactive',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email_UNIQUE` (`email`) -- Ensure email is unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Drop stored procedure if it exists 
DROP PROCEDURE IF EXISTS `addUser`;

-- Create stored procedure addUser
DELIMITER //
CREATE PROCEDURE `addUser`(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO `users` (`email`, `password`, `type`) 
    VALUES (p_email, p_password, p_type);
END //
DELIMITER ;

-- Call stored procedure to add sample users
CALL `addUser`('example@example.com', 'password123', 'standard');
CALL `addUser`('admin@clickfit.com', 'securePass!23', 'admin');


