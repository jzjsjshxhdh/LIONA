<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بروفايل فخم</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* تنسيق عام */
        body {
            font-family: Arial, sans-serif;
            background-color: #1e1e1e;
            color: #fff;
            margin: 0;
            padding: 0;
            padding-top: 220px; /* إضافة مساحة لعرض المحتوى أسفل البروفايل الثابت */
        }

        /* تنسيق قسم البروفايل الثابت */
        .profile-container {
            background-color: #2c2c2c;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
            width: 350px; /* زيادة العرض */
            position: fixed;
            top: 20px; /* مسافة من الأعلى */
            left: 50%; /* توسيط أفقي */
            transform: translateX(-50%); /* توسيط أفقي */
            z-index: 1000;
            display: none; /* مخفي بشكل افتراضي */
        }

        /* تنسيق أيقونة البروفايل */
        .profile-icon {
            font-size: 60px;
            color: #ffcc00;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
        }

        /* تنسيق علامة التوثيق */
        .verification-badge {
            position: absolute;
            bottom: 0;
            right: 0;
            background-color: #4caf50;
            color: #fff;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            border: 2px solid #2c2c2c;
            display: none; /* مخفي بشكل افتراضي */
        }

        /* تنسيق اسم المستخدم */
        .profile-name {
            font-size: 24px;
            font-weight: bold;
            color: #ffcc00;
            margin-bottom: 20px;
        }

        /* تنسيق حقل الإدخال */
        .input-field {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #444;
            background-color: #1e1e1e;
            color: #fff;
            font-size: 16px;
            margin-bottom: 20px;
            text-align: center;
        }

        /* تنسيق زر الحفظ */
        .save-button {
            background-color: #ffcc00;
            color: #1e1e1e;
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .save-button:hover {
            background-color: #e6b800;
        }

        /* قسم الرصيد والسحوبات */
        .balance-withdrawals {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }

        .balance-withdrawals div {
            background-color: #1e1e1e;
            border-radius: 10px;
            padding: 10px;
            width: 48%;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .balance-withdrawals div p {
            margin: 0;
            font-size: 16px;
            color: #ffcc00;
        }

        .balance-withdrawals div span {
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }

        /* واجهة تسجيل الدخول */
        .login-container {
            background-color: #2c2c2c;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
            width: 300px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        }

        .login-container h2 {
            margin-bottom: 20px;
            color: #ffcc00;
        }

        .login-container input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 10px;
            border: 2px solid #444;
            background-color: #1e1e1e;
            color: #fff;
            font-size: 16px;
            text-align: center;
        }

        .login-container button {
            width: 100%;
            padding: 10px;
            background-color: #ffcc00;
            color: #1e1e1e;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .login-container button:hover {
            background-color: #e6b800;
        }

        .error-message {
            color: red;
            margin-top: 10px;
        }

        /* زر تسجيل الخروج */
        .logout-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #ffcc00;
            font-size: 20px;
            cursor: pointer;
        }

        .logout-button:hover {
            color: #e6b800;
        }

        /* تحذير تسجيل الخروج */
        .logout-confirmation {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #2c2c2c;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
            z-index: 2000;
            display: none; /* مخفي بشكل افتراضي */
        }

        .logout-confirmation p {
            font-size: 18px;
            margin-bottom: 20px;
            color: #fff;
        }

        .logout-confirmation button {
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin: 0 10px;
            transition: background-color 0.3s ease;
        }

        .logout-confirmation button.logout {
            background-color: #ff4d4d;
            color: #fff;
        }

        .logout-confirmation button.logout:hover {
            background-color: #cc0000;
        }

        .logout-confirmation button.cancel {
            background-color: #4caf50;
            color: #fff;
        }

        .logout-confirmation button.cancel:hover {
            background-color: #388e3c;
        }

        /* قسم السحب والإيداع */
        .withdraw-deposit {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
        }

        .withdraw-deposit div {
            background-color: #1e1e1e;
            border-radius: 15px;
            padding: 15px;
            width: 48%;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .withdraw-deposit div:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        }

        .withdraw-deposit div i {
            font-size: 24px;
            color: #ffcc00;
            margin-bottom: 10px;
        }

        .withdraw-deposit div p {
            margin: 0;
            font-size: 16px;
            color: #ffcc00;
        }

        .withdraw-deposit div span {
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }

        /* قسم سجل العمليات */
        .operations-history {
            margin-top: 30px;
            background-color: #1e1e1e;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-height: 200px; /* ارتفاع ثابت */
            overflow-y: auto; /* تمكين التمرير العمودي */
        }

        .operations-history h3 {
            font-size: 20px;
            color: #ffcc00;
            margin-bottom: 15px;
        }

        .operations-history ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .operations-history li {
            background-color: #2c2c2c;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }

        .operations-history li span {
            font-size: 16px;
            color: #fff;
        }

        .operations-history li .type {
            font-weight: bold;
        }

        .operations-history li .type.deposit {
            color: #4caf50; /* أخضر للإيداع */
        }

        .operations-history li .type.withdraw {
            color: #ff4d4d; /* أحمر للسحب */
        }

        .operations-history li .status {
            font-size: 14px;
            font-weight: bold;
            padding: 5px 10px;
            border-radius: 5px;
        }

        .operations-history li .status.accepted {
            background-color: #4caf50;
            color: #fff;
        }

        .operations-history li .status.pending {
            background-color: #ffcc00;
            color: #1e1e1e;
        }

        .operations-history li .status.rejected {
            background-color: #ff4d4d;
            color: #fff;
        }

        /* نافذة إدخال المبلغ */
        .amount-input-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #2c2c2c;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
            z-index: 3000;
            display: none; /* مخفي بشكل افتراضي */
        }

        .amount-input-modal h3 {
            font-size: 20px;
            color: #ffcc00;
            margin-bottom: 15px;
        }

        .amount-input-modal input {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #444;
            background-color: #1e1e1e;
            color: #fff;
            font-size: 16px;
            margin-bottom: 15px;
            text-align: center;
        }

        .amount-input-modal button {
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin: 0 10px;
            transition: background-color 0.3s ease;
        }

        .amount-input-modal button.confirm {
            background-color: #4caf50;
            color: #fff;
        }

        .amount-input-modal button.confirm:hover {
            background-color: #388e3c;
        }

        .amount-input-modal button.cancel {
            background-color: #ff4d4d;
            color: #fff;
        }

        .amount-input-modal button.cancel:hover {
            background-color: #cc0000;
        }
    </style>
</head>
<body>
    <!-- واجهة تسجيل الدخول -->
    <div id="login-container" class="login-container">
        <h2>تسجيل الدخول</h2>
        <input type="email" id="email" placeholder="البريد الإلكتروني">
        <input type="password" id="password" placeholder="كلمة المرور">
        <button onclick="login()">تسجيل الدخول</button>
        <div id="error-message" class="error-message"></div>
    </div>

    <!-- قسم البروفايل الثابت -->
    <div id="profile-container" class="profile-container">
        <!-- زر تسجيل الخروج -->
        <button class="logout-button" onclick="showLogoutConfirmation()">
            <i class="fas fa-sign-out-alt"></i>
        </button>

        <!-- أيقونة البروفايل مع علامة التوثيق -->
        <div class="profile-icon">
            <i class="fas fa-user-circle"></i>
            <div class="verification-badge" id="verificationBadge">
                <i class="fas fa-check"></i>
            </div>
        </div>

        <!-- اسم المستخدم -->
        <div class="profile-name" id="profileName">اسم المستخدم</div>

        <!-- حقل إدخال الاسم -->
        <div id="name-input-container">
            <input type="text" class="input-field" id="nameInput" placeholder="أدخل اسمك">
            <button class="save-button" id="saveButton" onclick="saveName()">حفظ</button>
        </div>

        <!-- قسم الرصيد والسحوبات -->
        <div class="balance-withdrawals">
            <div>
                <p>رصيدك الحالي</p>
                <span>0 USDT</span>
            </div>
            <div>
                <p>سحوباتك</p>
                <span>0 USDT</span>
            </div>
        </div>

        <!-- قسم السحب والإيداع -->
        <div class="withdraw-deposit">
            <div onclick="showAmountInput('سحب')">
                <i class="fas fa-money-bill-wave"></i>
                <p>سحب</p>
                <span>0 USDT</span>
            </div>
            <div onclick="showAmountInput('إيداع')">
                <i class="fas fa-coins"></i>
                <p>إيداع</p>
                <span>0 USDT</span>
            </div>
        </div>

        <!-- قسم سجل العمليات -->
        <div class="operations-history">
            <h3>سجل العمليات</h3>
            <ul id="operations-list">
                <!-- العمليات السابقة ستظهر هنا -->
            </ul>
        </div>
    </div>

    <!-- تحذير تسجيل الخروج -->
    <div id="logout-confirmation" class="logout-confirmation">
        <p>هل أنت متأكد من تسجيل الخروج؟</p>
        <button class="logout" onclick="logout()">خروج</button>
        <button class="cancel" onclick="hideLogoutConfirmation()">إلغاء</button>
    </div>

    <!-- نافذة إدخال المبلغ -->
    <div id="amount-input-modal" class="amount-input-modal">
        <h3 id="modal-title"></h3>
        <input type="number" id="amount-input" placeholder="أدخل المبلغ">
        <button class="confirm" onclick="confirmOperation()">تأكيد</button>
        <button class="cancel" onclick="hideAmountInput()">إلغاء</button>
    </div>

    <script type="module">
        // Import Firebase functions
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // إضافة Firestore

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDMVeTnrXBGDnhLRX6Xi7t31EuMwSwjm6E",
            authDomain: "dddddd-21946.firebaseapp.com",
            projectId: "dddddd-21946",
            storageBucket: "dddddd-21946.appspot.com",
            messagingSenderId: "973164907221",
            appId: "1:973164907221:web:42382ef8d9fe8df843705c",
            measurementId: "G-V6RD9GTZ59"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app); // تهيئة Firestore

        // عناصر واجهة المستخدم
        const loginContainer = document.getElementById('login-container');
        const profileContainer = document.getElementById('profile-container');
        const errorMessage = document.getElementById('error-message');
        const nameInput = document.getElementById('nameInput');
        const profileName = document.getElementById('profileName');
        const verificationBadge = document.getElementById('verificationBadge');
        const saveButton = document.getElementById('saveButton');
        const nameInputContainer = document.getElementById('name-input-container');
        const logoutConfirmation = document.getElementById('logout-confirmation');
        const amountInputModal = document.getElementById('amount-input-modal');
        const modalTitle = document.getElementById('modal-title');
        const amountInput = document.getElementById('amount-input');
        const operationsList = document.getElementById('operations-list');

        // بيانات العمليات
        let operations = [];

        // تسجيل الدخول
        window.login = function () {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // مسح الرسائل القديمة
            errorMessage.textContent = '';

            // التحقق من إدخال البيانات
            if (!email || !password) {
                errorMessage.textContent = "الرجاء إدخال البريد الإلكتروني وكلمة المرور.";
                return;
            }

            // تسجيل الدخول باستخدام Firebase
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // نجاح تسجيل الدخول
                    const user = userCredential.user;
                    console.log("تم تسجيل الدخول بنجاح:", user);
                    showProfilePage(); // عرض صفحة البروفايل
                    loadUserData(user.uid); // تحميل بيانات المستخدم
                })
                .catch((error) => {
                    // خطأ في تسجيل الدخول
                    const errorCode = error.code;
                    const errorMessageText = error.message;
                    errorMessage.textContent = "خطأ في تسجيل الدخول: " + errorMessageText;
                    console.error("خطأ:", errorCode, errorMessageText);
                });
        };

        // تحميل بيانات المستخدم
        async function loadUserData(userId) {
            try {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    profileName.textContent = userData.name; // تعيين الاسم المحفوظ
                    verificationBadge.style.display = 'flex'; // إظهار علامة التوثيق
                    nameInputContainer.style.display = 'none'; // إخفاء حقل الإدخال
                } else {
                    nameInputContainer.style.display = 'block'; // إظهار حقل الإدخال إذا لم يتم حفظ اسم
                }
            } catch (error) {
                console.error("خطأ في تحميل بيانات المستخدم:", error);
            }
        }

        // حفظ الاسم
        window.saveName = async function () {
            const name = nameInput.value.trim();
            if (name === '') {
                alert('الرجاء إدخال اسمك!');
                return;
            }

            const user = auth.currentUser;
            if (user) {
                try {
                    // حفظ الاسم في Firestore
                    await setDoc(doc(db, "users", user.uid), {
                        name: name,
                    });

                    // تحديث واجهة المستخدم
                    profileName.textContent = name;
                    verificationBadge.style.display = 'flex';
                    nameInputContainer.style.display = 'none'; // إخفاء حقل الإدخال بعد الحفظ
                } catch (error) {
                    console.error("خطأ في حفظ الاسم:", error);
                    alert("حدث خطأ أثناء حفظ الاسم. الرجاء المحاولة مرة أخرى.");
                }
            } else {
                alert("لم يتم العثور على مستخدم. الرجاء تسجيل الدخول أولاً.");
            }
        };

        // إظهار تحذير تسجيل الخروج
        window.showLogoutConfirmation = function () {
            logoutConfirmation.style.display = 'block';
        };

        // إخفاء تحذير تسجيل الخروج
        window.hideLogoutConfirmation = function () {
            logoutConfirmation.style.display = 'none';
        };

        // تسجيل الخروج
        window.logout = function
