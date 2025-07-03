# 🛠️ Tour Operator Theme Setup Tool

This tool automates the setup of a custom WordPress theme based on the **Twenty Twenty-Five** theme. It clones the original theme, replaces key values, and prepares your theme for development.

---

## 📦 Installation & Setup

### 1. Clone or Download This Repository

Clone the repository or download the project files to your local machine.

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2: Make the Script Executable

Once the you are inside the repo folder run the following command in your terminal to make it executable:

```bash
chmod +x setup-theme.sh
```

---

### 3: Run the Script

Now you can run the script by executing:

```bash
./setup-theme.sh
```

---

## 💬 During Setup

You will be prompted to:

1. **Enter a new theme name**  
   This replaces all instances of `"Twenty Twenty-Five"` in the theme files.

2. **Enter your WordPress.org username**  
   This updates the `Author:` field in `style.css` and clears the `Description:` field.

---

## ⚙️ What This Script Does

1. **Clones** the Twenty Twenty-Five theme from GitHub into a temporary `temp` folder.
2. **Moves** theme files to the project root, excluding:
   - `.git`, `.gitignore`, `.gitattributes`
   - `package.json`, `package-lock.json`
   - `composer.json`, `composer.lock`
3. **Deletes** the temporary folder.
4. **Replaces**:
   - `"Twenty Twenty-Five"` → your provided theme name
   - `Author:` in `style.css` → your WordPress.org username
   - Clears the `Description:` field in `style.css`

---

## 📂 After Setup

- Your root folder will now contain the customized theme.
- You can:
  - Rename the folder to match your theme slug
  - Begin development
  - Zip and distribute/upload your theme

---

## ❓ Troubleshooting

- **Permission Errors?** Try running with elevated privileges (`sudo` on macOS/Linux).
- **Internet Issues?** Ensure you're online so the GitHub repository can be cloned.

---

## 📝 License

This project is licensed under the MIT License. Customize and use it freely in your theme development process.

---

## 📣 Contribute

Feel free to fork this repo and contribute improvements via pull requests!
