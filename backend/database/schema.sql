-- Create database
CREATE DATABASE IF NOT EXISTS shoponline;
USE shoponline;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category`, `stock`, `created_at`) VALUES
(1, 'Áo thun nam', 'Áo thun cotton chất lượng cao, thoáng mát', 199000.00, 'https://down-vn.img.susercontent.com/file/sg-11134201-22110-jdr1rtj6dljva6', 'Áo', 50, '2025-12-13 15:26:00'),
(2, 'Quần jean nữ', 'Quần jean form slim, chất liệu bền đẹp', 499000.00, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhfwhumu5i9tbe', 'Quần', 30, '2025-12-13 15:26:00'),
(3, 'Giày thể thao', 'Giày thể thao đế cao su, êm ái', 899000.00, 'https://cf.shopee.vn/file/e03d750adab60dd0ee588bb8f5d40848', 'Giày', 25, '2025-12-13 15:26:00'),
(4, 'Túi xách da', 'Túi xách da thật, thiết kế sang trọng', 1299000.00, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhd7dkp7qsz6c0', 'Phụ kiện', 15, '2025-12-13 15:26:00'),
(5, 'Đồng hồ nam', 'Đồng hồ chính hãng, pin bền', 1599000.00, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-rbaqayihnhov62', 'Phụ kiện', 20, '2025-12-13 15:26:00'),
(6, 'Áo khoác', 'Áo khoác chống nước, ấm áp', 799000.00, 'https://down-vn.img.susercontent.com/file/sg-11134201-22110-rvqqw9phnnjv09', 'Áo', 40, '2025-12-13 15:26:00');

