// Function to check and request notification permission
function requestNotificationPermission() {
    if (Notification.permission === "default") {
        // Ask the user if they want to enable notifications
        if (confirm("هل تريد تشغيل الإشعارات لتنبيهات الزلازل؟")) {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("تم منح إذن الإشعارات.");
                } else {
                    console.log("تم رفض إذن الإشعارات.");
                }
            });
        }
    } else if (Notification.permission === "granted") {
        console.log("الإشعارات مفعلة بالفعل.");
    } else {
        console.log("الإشعارات مرفوضة.");
    }
}

function simulateUpcomingEarthquakes() {
    const egyptGovernorates = [
        "القاهرة", "الإسكندرية", "الجيزة", "بورسعيد", "السويس",
        "الأقصر", "أسوان", "أسيوط", "البحيرة", "بني سويف",
        "الدقهلية", "دمياط", "الفيوم", "الغربية", "الإسماعيلية",
        "كفر الشيخ", "مطروح", "المنيا", "المنوفية", "الوادي الجديد",
        "شمال سيناء", "القليوبية", "قنا", "البحر الأحمر", "الشرقية",
        "سوهاج", "جنوب سيناء"
    ];

    const upcomingEarthquakes = egyptGovernorates.slice(0, 10).map(gov => {
        const magnitude = (Math.random() * 4 + 1).toFixed(2); // درجة عشوائية بين 1.00 و 5.00
        const isMinor = magnitude < 4.0 ? "زلزال طفيف" : "زلزال كبير";
        const time = new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toLocaleString('en-US', { hour12: false }); // وقت عشوائي في الأيام الـ 14 القادمة

        return {
            place: `${gov}, مصر`,
            magnitude,
            isMinor,
            time
        };
    });

    displayAlerts(upcomingEarthquakes, "upcoming");
}

function displayAlerts(earthquakes, type) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = ""; // مسح المحتوى

    earthquakes.forEach(eq => {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert";

        const place = document.createElement("div");
        place.className = "place";
        place.textContent = `الموقع: ${eq.place}`;

        const magnitude = document.createElement("div");
        magnitude.className = "magnitude";
        magnitude.textContent = `الدرجة: ${eq.magnitude} (${eq.isMinor})`;

        const time = document.createElement("div");
        time.className = "time";
        time.textContent = `الوقت: ${eq.time}`;

        alertDiv.appendChild(place);
        alertDiv.appendChild(magnitude);
        alertDiv.appendChild(time);
        alertContainer.appendChild(alertDiv);

        // إرسال إشعار لكل زلزال إذا كان قادمًا
        if (type === "upcoming") {
            sendNotification(eq.place, eq.magnitude);
        }
    });
}

function sendNotification(place, magnitude) {
    if (Notification.permission === "granted") {
        new Notification(`تنبيه زلزال: ${place}`, {
            body: `الدرجة: ${magnitude}`,
            icon: "https://example.com/earthquake-icon.png" // استبدل برابط الأيقونة الخاص بك
        });
    }
}

// طلب إذن الإشعارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    requestNotificationPermission();
});