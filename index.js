import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "A01 - App Graphics 2D";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "white",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

    // --ฟังก์ชันสำหรับวาดกอหญ้า--
    function drawGrass(x, y, size = 30, color = "#047507ff") { 
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2; // ความหนาของเส้น
        ctx.beginPath();
        ctx.moveTo(x, y); // จุดเริ่มต้น
        ctx.lineTo(x, y - size); // ก้านกลาง
        ctx.moveTo(x, y); // จุดเริ่มต้นใหม่
        ctx.lineTo(x + size * 0.3, y - size * 0.6); // กิ่งขวา
        ctx.stroke();
        ctx.restore();
    }

    // -- ตำแหน่งกอหญ้า --
    const grassCount = 10; // <<== ปรับจำนวนกอหญ้าได้ที่นี่
        const grassPositions = [];
            for (let i = 0; i < grassCount; i++) {
            let gx, gy;
            gy = config.height / 2 + 30 + Math.random() * (config.height / 2 - 40); // กอหญ้าจะอยู่ในครึ่งล่าง

            // สุ่มฝั่ง: ซ้ายของแม่น้ำ, ขวาของแม่น้ำ
            let edge = Math.random();
            if (edge < 0.2) {
            // ฝั่งซ้ายของแม่น้ำ
            gx = 60 + Math.random() * 200; // ไม่ให้ทับแม่น้ำ
            } else {
            // ฝั่งขวาของแม่น้ำ
            gx = 540 + Math.random() * 180; // ไม่ให้ทับแม่น้ำ
            // ไม่ให้ทับกระท่อม (บ้านอยู่ x:600-660, y:370-420)
            if (gx > 590 && gx < 670 && gy > 360 && gy < 430) {
                i--;
                continue;
            }
        }
        grassPositions.push({ x: gx, y: gy, size: 28 + Math.random() * 2 }); // ขนาดกอหญ้า
    }

    // --ฟังก์ชันสำหรับวาดเมฆ--
    function drawCloud(x, y, scale = 1) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.85; // ค่า alpha เพื่อให้เมฆดูโปร่งแสง
        ctx.beginPath();
        ctx.arc(x, y, 28 * scale, 0, 2 * Math.PI); // วงกลมกลาง
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - 22 * scale, y + 8 * scale, 18 * scale, 0, 2 * Math.PI); // วงกลมซ้าย
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 22 * scale, y + 8 * scale, 16 * scale, 0, 2 * Math.PI); // วงกลมขวา
        ctx.fill();
        ctx.restore();
    }
    // -- ข้อมูลเมฆ (ตำแหน่ง, ขนาด, ความเร็ว) --
    const clouds = [
        { x: 120, y: 90, scale: 1.1, speed: 0.4 }, // เมฆซ้าย
        { x: 400, y: 60, scale: 1.3, speed: 0.2 }, // เมฆกลาง
        { x: 670, y: 100, scale: 1.0, speed: 0.2 } // เมฆขวา
    ];

    // --ฟังก์ชันสำหรับวาดนก--
    function drawBird(x, y, scale = 1) {
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2 * scale; // ความหนาของเส้น
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x - 10 * scale, y - 10 * scale, x - 20 * scale, y); // ปีกซ้าย
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 10 * scale, y - 10 * scale, x + 20 * scale, y); // ปีกขวา
        ctx.stroke();
        ctx.restore();
    }

	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);

		// วาดรูปจากส่วนนี้ไป **แนะนำให้วาดจากรูปที่อยู่ด้านหลังไปด้านหน้าตามลำดับ**
		// ใช้ภาพจาก MP1-app-graphics-2d.jpg เป็นแนวทางในการวาดรูป แต่จะวาดอย่างไรก็ได้ตามต้องการ

		// TODO:
		// --วาดพื้นหลังครึ่งบน--
        ctx.fillStyle = "#4fc3f7";
        ctx.fillRect(0, 0, config.width, config.height / 2);

        // --วาดพื้นหลังครึ่งล่าง--
        ctx.fillStyle = "#3e9b43ff";
        ctx.fillRect(0, config.height / 2, config.width, config.height / 2);

        // --วาดเส้นแบ่งครึ่งบนล่าง--
        ctx.save();
        ctx.strokeStyle = "black"; // สีเส้น
        ctx.lineWidth = 2;         // ความหนาเส้น
        ctx.beginPath();
        ctx.moveTo(0, config.height / 2);  // จุดเริ่มต้นซ้ายกลางจอ
        ctx.lineTo(config.width, config.height / 2);  // จุดสิ้นสุดขวากลางจอ
        ctx.stroke();
        ctx.restore();

		// --- ลำธาร ---
        ctx.beginPath();
        ctx.moveTo(300, config.height / 2); // จุดเริ่มต้น
        ctx.bezierCurveTo(200, 450, 340, 450, 290, config.height); // จุดควบคุม 2 จุด
        ctx.lineTo(500, config.height);
        ctx.bezierCurveTo(590, 500, 400, 400, 510, config.height / 2); // จุดควบคุม 2 จุด
        ctx.closePath();
        ctx.fillStyle = "#93dcfdff"; // สีของลำธาร
        ctx.fill();
        
        // --วาดขอบลำธารเฉพาะด้านซ้ายและขวา(ให้ดูเป็นทราย)--
        ctx.save();
        ctx.strokeStyle = "#edb469ff";
        ctx.lineWidth = 10; // ความหนาของเส้น
        ctx.lineCap = "round"; // ปลายเส้นเป็นแบบกลม
        // ขอบซ้าย
        ctx.beginPath();
        ctx.moveTo(300, config.height / 2); // จุดเริ่มต้น
        ctx.bezierCurveTo(200, 450, 340, 450, 290, config.height); // จุดสิ้นสุด
        ctx.stroke();
        // ขอบขวา
        ctx.beginPath();
        ctx.moveTo(510, config.height / 2); // จุดเริ่มต้น
        ctx.bezierCurveTo(400, 400, 590, 500, 500, config.height); // จุดสิ้นสุด
        ctx.stroke();
        ctx.restore();

        // --วาดเส้นคลื่นในลำธาร--
		ctx.save();
        // ตัดขอบลำธารเพื่อให้เส้นคลื่นอยู่ภายในลำธาร
        ctx.beginPath();
        ctx.moveTo(300, config.height / 2); // จุดเริ่มต้น
        ctx.bezierCurveTo(200, 450, 340, 450, 290, config.height); // จุดควบคุม 2 จุด
        ctx.lineTo(500, config.height); // จุดสิ้นสุดขวาล่าง
        ctx.bezierCurveTo(500, 500, 400, 400, 510, config.height / 2); // จุดควบคุม 2 จุด
        ctx.closePath();
        ctx.clip();
        // วาดเส้นคลื่น
		ctx.strokeStyle = "white";
        ctx.lineWidth = 2; // ความหนาของเส้น
        // เส้นคลื่น 3 เส้น
        ctx.beginPath(); 
        ctx.moveTo(300, 350); 
        ctx.bezierCurveTo(420, 300, 400, 500, 650, 250); // จุดควบคุมโค้ง 1, จุดควบคุมโค้ง 2, จุดสิ้นสุด
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(320, 450);
        ctx.bezierCurveTo(400, 400, 510, 640, 570, 200); // จุดควบคุมโค้ง 1, จุดควบคุมโค้ง 2, จุดสิ้นสุด
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(340, 550);
        ctx.bezierCurveTo(400, 500, 530, 730, 800, 240); // จุดควบคุมโค้ง 1, จุดควบคุมโค้ง 2, จุดสิ้นสุด
        ctx.stroke(); 
        ctx.restore();

		// --- ภูเขา ---
        ctx.save();
        // ภูเขาลูกซ้ายสุด
        ctx.fillStyle = "#213e21ff";
        ctx.beginPath();
        ctx.moveTo(-300, config.height / 2);
        ctx.quadraticCurveTo(80, -20, 350, config.height / 2); // จุดควบคุมและจุดสิ้นสุด
        ctx.closePath();
        ctx.fill();

        // ภูเขาลูกกลาง
        ctx.fillStyle = "#254b25ff";
        ctx.beginPath();
        ctx.moveTo(230, config.height / 2);
        ctx.quadraticCurveTo(450, 10, 680, config.height / 2); // จุดควบคุมและจุดสิ้นสุด
        ctx.closePath();
        ctx.fill();

        // ภูเขาลูกขวาสุด
        ctx.fillStyle = "#285428ff";
        ctx.beginPath();
        ctx.moveTo(500, config.height / 2);
        ctx.quadraticCurveTo(600, 40, 1000, config.height / 2); // จุดควบคุมและจุดสิ้นสุด
        ctx.closePath();
        ctx.fill();
        ctx.restore();

		// --- ดวงอาทิตย์ ---
        ctx.save();
        // ตำแหน่งดวงอาทิตย์
        const sunX = 300, sunY = 100, sunRadius = 38;
        // สร้าง gradient สำหรับดวงอาทิตย์
        let gradient = ctx.createRadialGradient(sunX, sunY, sunRadius, sunX, sunY, sunRadius * 2); // จุดเริ่มต้นและจุดสิ้นสุดของรัศมี
        gradient.addColorStop(0, "rgba(244, 206, 40, 0.7)"); // สีตรงกลาง
        gradient.addColorStop(0.5, "rgba(255, 223, 80, 0.2)"); // สีระหว่างกลาง
        gradient.addColorStop(1, "rgba(216, 123, 29, 0)"); // สีขอบนอกสุด
        // วาดแสงรอบดวงอาทิตย์
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius * 3, 0, 2 * Math.PI); // วาดวงกลมใหญ่สำหรับแสงรอบดวงอาทิตย์
        ctx.fillStyle = gradient;
        ctx.fill();
        // วาดดวงอาทิตย์
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI); // วาดวงกลมสำหรับดวงอาทิตย์
        ctx.fillStyle = "#e78712ff";
        ctx.shadowColor = "#ce6502ff";
        ctx.shadowBlur = 18; // ความเบลอของเงา
        ctx.fill();
        ctx.restore();

		// --วาดบ้าน--
        ctx.save();
        // ตัวบ้าน (สี่เหลี่ยม)
        ctx.fillStyle = "#deb887"; // สีน้ำตาลอ่อน
        ctx.fillRect(600, 370, 60, 50);

        // หลังคา (สามเหลี่ยม)
        ctx.beginPath();
        ctx.moveTo(590, 370); // ซ้ายล่างหลังคา
        ctx.lineTo(630, 340); // ยอดหลังคา
        ctx.lineTo(670, 370); // ขวาล่างหลังคา
        ctx.closePath();
        ctx.fillStyle = "#8d5524"; // สีน้ำตาลเข้ม
        ctx.fill();

        // ประตู
        ctx.fillStyle = "#a0522d";
        ctx.fillRect(625, 400, 15, 20);

        // หน้าต่าง
        ctx.fillStyle = "#e0a524ff";
        ctx.fillRect(610, 385, 12, 12);
        ctx.restore();

        // --วาดต้นไม้--
        ctx.save();
        // ลำต้น
        ctx.fillStyle = "#653911ff";
        ctx.fillRect(120, 340, 32, 90);

        // (ใบไม้) ใช้หลายวงกลมซ้อนกัน
        ctx.beginPath();
        ctx.arc(136, 300, 55, 0, 2 * Math.PI); // บน
        ctx.arc(100, 330, 38, 0, 2 * Math.PI); // ซ้าย
        ctx.arc(172, 320, 40, 0, 2 * Math.PI); // ขวา
        ctx.arc(150, 350, 30, 0, 2 * Math.PI); // ล่าง
        ctx.fillStyle = "#047507ff";
        ctx.fill();
        ctx.restore();

        // --- กอหญ้า ---
        grassPositions.forEach(g => drawGrass(g.x, g.y, g.size)); // วาดกอหญ้าทุกตำแหน่งที่เตรียมไว้

        // --- เมฆ ---
        clouds.forEach(cloud => {
        cloud.x -= cloud.speed; // เคลื่อนที่ไปทางซ้าย
        if (cloud.x < -80) {    // ถ้าเลยซ้ายสุดของจอ
        cloud.x = config.width + 80; // ให้ไปเริ่มที่ขวาสุดของจอ
        }
        drawCloud(cloud.x, cloud.y, cloud.scale); 
        });

        // --- นก ---
        drawBird(250, 80, 1.2); // นกซ้าย
        drawBird(550, 100, 1.2); // นกขวา

        // เขตสิ้นสุดของการวาดรูป


        // แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
        if (config.debug) FPS.show(ctx, 10, 28);

        // ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
        requestAnimationFrame(draw);
    }
    // เริ่มต้นการวาดภาพบน canvas
    draw();
}