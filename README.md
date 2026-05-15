# 🚁 Drono — Drone Delivery Website Prototype

> A full-stack localhost web application built with **HTML**, **CSS**, **JavaScript**, **PHP**, and **MySQL**. Designed to run on a local server (XAMPP / WAMP / LAMP).

---

## 📁 Project Structure

```
Drono/
├── html/           # All HTML page templates
├── css/ (style/)   # Stylesheets for the UI
├── js/             # Client-side JavaScript logic
├── php/            # Server-side PHP scripts (forms, auth, DB queries)
├── resources/      # Images, icons, and other assets
└── Drono.sql       # MySQL database schema & seed data
```

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed:

- [XAMPP](https://www.apachefriends.org/) (or WAMP / LAMP) — provides Apache + MySQL + PHP
- [Git](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Edge)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CybrS07/Drono.git
```

### 2. Move to your Server Root

**XAMPP (Windows):**
```bash
move Drono C:\xampp\htdocs\Drono
```

**XAMPP (macOS/Linux):**
```bash
mv Drono /opt/lampp/htdocs/Drono
```

**WAMP (Windows):**
```bash
move Drono C:\wamp64\www\Drono
```

### 3. Import the Database

1. Start **Apache** and **MySQL** from your XAMPP/WAMP control panel
2. Open your browser and go to: `http://localhost/phpmyadmin`
3. Create a new database named `drono`
4. Click **Import**, select `Drono.sql` from the project root, and click **Go**

```bash
# OR via MySQL CLI:
mysql -u root -p drono < Drono.sql
```

### 4. Configure Database Connection

Open the PHP config file (usually inside `php/`) and update your credentials:

```php
$host     = "localhost";
$user     = "root";
$password = "";          // your MySQL password
$database = "drono";
```

### 5. Launch the App

Make sure Apache is running, then open your browser:

```
http://localhost/Drono/html/index.html
```

---

## 🖥️ Usage

| Page | URL | Description |
|------|-----|-------------|
| Home | `/html/index.html` | Landing page |
| Register | `/html/register.html` | Create a new account |
| Login | `/html/login.html` | User authentication |
| Dashboard | `/html/dashboard.html` | Main user panel |
| Order | `/html/order.html` | Place a drone delivery order |
| Admin | `/html/admin.html` | Admin management panel |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 |
| Interactivity | JavaScript (Vanilla) |
| Backend | PHP |
| Database | MySQL |
| Local Server | Apache (via XAMPP/WAMP) |

---

## 🗄️ Database

The `Drono.sql` file contains all the table definitions and sample data needed to run the project. Import it into a database named `drono` as described in Step 3 above.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⚠️ **Note:** This is a localhost prototype intended for development and learning purposes only. It is not production-ready.
