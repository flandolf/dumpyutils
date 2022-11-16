const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./db.sqlite", table: `warns_753142627339075677_712032740043784334` });
const db2 = new QuickDB({ filePath: "./db.sqlite", table: `cmdserved` });
(async () => {
    const all = await db.all();
    console.log(all)
    
})();