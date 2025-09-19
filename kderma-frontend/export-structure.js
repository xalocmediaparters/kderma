import { exec } from "child_process";

exec('npx tree -I "node_modules|.git|.husky|dist" -L 4', (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error exporting structure:", err);
    return;
  }
  if (stderr) {
    console.error("⚠️ Stderr:", stderr);
  }

  // Write output to file
  import("fs").then(fs => {
    fs.writeFileSync("project_structure.txt", stdout, "utf-8");
    console.log("✅ Project structure exported to project_structure.txt");
  });
});
