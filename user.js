 
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyAY35HihNbRW1vcBhmOY7qv-Dh1GUY3f8Y",
            authDomain: "ovpfa-fad.firebaseapp.com",
            projectId: "ovpfa-fad",
            storageBucket: "ovpfa-fad.firebasestorage.app",
            messagingSenderId: "494485382397",
            appId: "1:494485382397:web:14e6eb9e8a0fc7eb144a94",
            measurementId: "G-LQM87WX605"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Attach to window for React to access
        window.db = db;
        window.collection = collection;
        window.addDoc = addDoc;
        window.doc = doc;
        window.updateDoc = updateDoc;
        window.serverTimestamp = serverTimestamp;

        
        const { useState, useMemo } = React;

        // --- DATA CONSTANTS ---
        const COLLEGE_DATA = {
            "CAH (COLLEGE OF ARTS AND HUMANITIES)": ["BACHELOR OF ARTS IN COMMUNICATION", "BACHELOR OF ARTS IN POLITICAL SCIENCE", "BACHELOR OF ARTS IN PHILIPPINE STUDIES", "BACHELOR OF SCIENCE IN SOCIAL WORK", "BACHELOR OF SCIENCE IN PSYCHOLOGY"],
            "CBA (COLLEGE OF BUSINESS AND ACCOUNTANCY)": ["BACHELOR OF SCIENCE ACCOUNTANCY", "BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING", "BSBA - HUMAN RESOURCE MANAGEMENT", "BSBA - BUSINESS ECONOMICS", "BSBA - FINANCIAL MANAGEMENT", "BSBA - MARKETING MANAGEMENT", "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP - FRANCHISING AND TRADING", "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP - AGRI-BUSINESS", "BACHELOR OF SCIENCE IN ENTREPRENEURSHIP - INNOVATION AND TECHNOLOGY", "BACHELOR OF SCIENCE IN PUBLIC ADMINISTRATION"],
            "CCJE (COLLEGE OF CRIMINAL JUSTICE EDUCATION)": ["BACHELOR OF SCIENCE IN CRIMINOLOGY"],
            "CoE (COLLEGE OF ENGINEERING)": ["BACHELOR OF SCIENCE IN PETROLEUM ENGINEERING", "BACHELOR OF SCIENCE IN ELECTRICAL ENGINEERING", "BACHELOR OF SCIENCE IN CIVIL ENGINEERING", "BACHELOR OF SCIENCE IN MECHANICAL ENGINEERING"],
            "CAD (COLLEGE OF ARCHITECTURE AND DESIGN)": ["BACHELOR OF SCIENCE IN ARCHITECTURE"],
            "CHTM (COLLEGE OF HOSPITALITY AND TOURISM MANAGEMENT)": ["BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT - CULINARY ARTS AND KITCHEN MANAGEMENT", "BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT - HOTEL RESORT AND CLUB MANAGEMENT", "BACHELOR OF SCIENCE IN TOURISM MANAGEMENT"],
            "CNHS (COLLEGE OF NURSING AND HEALTH SCIENCES)": ["BACHELOR OF SCIENCE IN NURSING", "BACHELOR OF SCIENCE IN MIDWIFERY", "DIPLOMA IN MIDWIFERY"],
            "CS (COLLEGE OF SCIENCES)": ["BACHELOR OF SCIENCE IN BIOLOGY - MEDICAL BIOLOGY", "BACHELOR OF SCIENCE IN BIOLOGY - PREPARATORY MEDICINE", "BACHELOR OF SCIENCE IN MARINE BIOLOGY", "BACHELOR OF SCIENCE IN COMPUTER SCIENCE", "BACHELOR OF SCIENCE IN ENVIRONMENTAL SCIENCE", "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY"],
            "CTE (COLLEGE OF TEACHER EDUCATION)": ["BACHELOR OF ELEMENTARY EDUCATION", "BACHELOR OF SECONDARY EDUCATION MAJOR IN ENGLISH", "BACHELOR OF SECONDARY EDUCATION MAJOR IN FILIPINO", "BACHELOR OF SECONDARY EDUCATION MAJOR IN MATHEMATICS", "BACHELOR OF SECONDARY EDUCATION MAJOR IN SCIENCE", "BACHELOR OF SECONDARY EDUCATION MAJOR IN SOCIAL STUDIES", "BACHELOR OF SECONDARY EDUCATION MAJOR IN VALUES EDUCATION", "BACHELOR OF PHYSICAL EDUCATION"],
        };

        // --- MAIN APP ---
        function App() {
            const [step, setStep] = useState(1);
            const [documentId, setDocumentId] = useState(null); 
            const [isLoading, setIsLoading] = useState(false);
            const [reservationData, setReservationData] = useState({});

            const handleReservationSuccess = (id, formData) => {
                setDocumentId(id);
                setReservationData(formData); 
                setStep(2);
                window.scrollTo(0, 0);
            };

            const handleApplicationSuccess = () => {
                setStep(3);
                window.scrollTo(0, 0);
            };

            return (
                <div className="min-h-screen flex flex-col items-center pt-10 pb-20 px-4">
                    <div className="text-center mb-10">
                        <i className="fas fa-university text-5xl text-blue-600 mb-4"></i>
                        <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">PSU Dormitory Reservation and Application</h1>
                        <p className="text-gray-500 uppercase text-xs tracking-widest mt-2">Office of the Vice President for Finance and Administration</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="w-full max-w-3xl mb-8 flex items-center justify-center">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">1</span>
                            <span className="uppercase text-xs font-bold tracking-wider">Reservation</span>
                        </div>
                        <div className="w-20 h-1 bg-gray-300 mx-4">
                            <div className={`h-full bg-blue-600 transition-all ${step > 1 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">2</span>
                            <span className="uppercase text-xs font-bold tracking-wider">Application</span>
                        </div>
                    </div>

                    <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border overflow-hidden">
                        {step === 1 && (
                            <ReservationForm onSuccess={handleReservationSuccess} loading={isLoading} setLoading={setIsLoading} />
                        )}
                        {step === 2 && (
                            <ApplicationForm docId={documentId} reservationData={reservationData} onSuccess={handleApplicationSuccess} loading={isLoading} setLoading={setIsLoading}/>
                        )}
                        {step === 3 && (
                            <div className="p-12 text-center animate-fade">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h2 className="text-2xl font-bold mb-2 uppercase">Application Submitted!</h2>
                                <p className="text-gray-600 mb-6 uppercase text-sm">Your data has been sent to the admin. Please wait for the confirmation email.</p>
                                <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline uppercase text-sm font-bold">Start New Application</button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // --- STEP 1: RESERVATION ---
        function ReservationForm({ onSuccess, loading, setLoading }) {
            const [data, setData] = useState({
                RES_resFirstName: '', RES_resMiddleName: '', RES_resLastName: '',
                RES_college: '', RES_course: '', RES_yearLevel: '',
                RES_dormPreference: '', RES_phone: '', RES_prospectedStayDate: ''
            });
            const [errors, setErrors] = useState({});

            const requiredFields = [
                'RES_resFirstName', 'RES_resLastName', 'RES_college', 
                'RES_course', 'RES_yearLevel', 'RES_dormPreference', 
                'RES_phone', 'RES_prospectedStayDate'
            ];

            const validate = () => {
                let tempErrors = {};
                let isValid = true;
                requiredFields.forEach(field => {
                    if (!data[field] || data[field].trim() === '') {
                        tempErrors[field] = 'This field is required.';
                        isValid = false;
                    }
                });
                if (data.RES_phone && !/^\d{10,12}$/.test(data.RES_phone.replace(/\s/g, ''))) {
                    tempErrors.RES_phone = 'Please enter a valid phone number (10-12 digits).';
                    isValid = false;
                }
                setErrors(tempErrors);
                return isValid;
            };

            const handleChange = (e) => {
                const { name, value } = e.target;
                let newValue = value;
                if (e.target.type !== 'date') newValue = value.toUpperCase();

                if (name === 'RES_resFirstName') {
                    const firstLetter = newValue.charAt(0);
                    const suggestedDorm = ['A', 'E', 'I', 'O', 'U'].includes(firstLetter) ? 'FEMALE DORM' : 'MALE DORM';
                    setData(prev => ({ ...prev, [name]: newValue, RES_dormPreference: suggestedDorm }));
                } else {
                    setData(prev => ({ ...prev, [name]: newValue }));
                }
                if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
            };

            const handleCollegeChange = (e) => {
                const newCollege = e.target.value;
                setData({ ...data, RES_college: newCollege, RES_course: "" });
                if (errors.RES_college) setErrors(prev => ({ ...prev, RES_college: null, RES_course: null }));
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                if (!validate()) { alert('Please correct highlighted errors.'); return; }
                setLoading(true);
                try {
                    const docRef = await window.addDoc(window.collection(window.db, "dorm_applications"), {
                        ...data, status: "RESERVED (INCOMPLETE)", createdAt: window.serverTimestamp()
                    });
                    onSuccess(docRef.id, data); 
                } catch (error) { alert("Error: " + error.message); } 
                finally { setLoading(false); }
            };

            return (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <h3 className="font-bold text-blue-700 uppercase text-sm">Step 1: Reservation Details</h3>
                        <p className="text-xs text-blue-600 uppercase">Please provide basic details to secure a slot.</p>
                    </div>
                    
                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Applicant Name</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup label="Last Name" name="RES_resLastName" value={data.RES_resLastName} onChange={handleChange} required error={errors.RES_resLastName}/>
                        <InputGroup label="First Name" name="RES_resFirstName" value={data.RES_resFirstName} onChange={handleChange} required error={errors.RES_resFirstName}/>
                        <InputGroup label="Middle Name" name="RES_resMiddleName" value={data.RES_resMiddleName} onChange={handleChange} error={errors.RES_resMiddleName}/>
                    </div>

                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Enrollment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectGroup label="College" name="RES_college" value={data.RES_college} onChange={handleCollegeChange} required error={errors.RES_college}>
                            <option value="">SELECT COLLEGE</option>
                            {Object.keys(COLLEGE_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                        </SelectGroup>
                        <SelectGroup label="Course" name="RES_course" value={data.RES_course} onChange={handleChange} required error={errors.RES_course} disabled={!data.RES_college}>
                            <option value="">{data.RES_college ? "SELECT COURSE" : "SELECT COLLEGE FIRST"}</option>
                            {(data.RES_college ? COLLEGE_DATA[data.RES_college] : []).map(c => <option key={c} value={c}>{c}</option>)}
                        </SelectGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectGroup label="Year Level" name="RES_yearLevel" value={data.RES_yearLevel} onChange={handleChange} required error={errors.RES_yearLevel}>
                            <option value="">SELECT YEAR</option>
                            <option value="1ST YEAR">1ST YEAR</option>
                            <option value="2ND YEAR">2ND YEAR</option>
                            <option value="3RD YEAR">3RD YEAR</option>
                            <option value="4TH YEAR">4TH YEAR</option>
                        </SelectGroup>
                        <SelectGroup label="Dorm Preference" name="RES_dormPreference" value={data.RES_dormPreference} onChange={handleChange} required error={errors.RES_dormPreference}>
                            <option value="MALE DORM">MALE DORM</option>
                            <option value="FEMALE DORM">FEMALE DORM</option>
                            <option value="FOREIGN DORM">FOREIGN DORM</option>
                            <option value="ANGAT BUHAY DORM">ANGAT BUHAY DORM</option>
                        </SelectGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Mobile Number" name="RES_phone" value={data.RES_phone} onChange={handleChange} required error={errors.RES_phone}/>
                        <InputGroup label="Start Date" name="RES_prospectedStayDate" type="date" value={data.RES_prospectedStayDate} onChange={handleChange} required error={errors.RES_prospectedStayDate}/>
                    </div>

                    <div className="pt-4 border-t flex justify-end">
                        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 text-sm uppercase tracking-wider disabled:bg-gray-400">
                            {loading ? <i className="fas fa-spinner fa-spin"></i> : <span>Next <i className="fas fa-arrow-right ml-1"></i></span>}
                        </button>
                    </div>
                </form>
            );
        }

        // --- STEP 2: APPLICATION ---
        function ApplicationForm({ docId, reservationData, onSuccess, loading, setLoading }) {
            const [data, setData] = useState({
                APP_studentId: '', APP_emailAddress: '', APP_address: '', APP_pob: '', 
                APP_motherFirstName: '', APP_motherMiddleName: '', APP_motherLastName: '', APP_motherAddress: '', APP_motherContact: '', APP_motherOccupation: '', APP_motherMonthlyIncome: '', 
                APP_fatherFirstName: '', APP_fatherMiddleName: '', APP_fatherLastName: '', APP_fatherAddress: '', APP_fatherContact: '', APP_fatherOccupation: '', APP_fatherMonthlyIncome: '', 
                APP_guardianType: 'MOTHER', APP_guardianFirstName: '', APP_guardianMiddleName: '', APP_guardianLastName: '', APP_guardianContact: '', APP_guardianAddress: ''
            });
            const [errors, setErrors] = useState({});
            
            const requiredFields = [
                'APP_studentId', 'APP_emailAddress', 'APP_address', 'APP_pob', 
                'APP_motherFirstName', 'APP_motherLastName', 'APP_motherAddress', 'APP_motherContact', 'APP_motherOccupation', 'APP_motherMonthlyIncome',
                'APP_fatherFirstName', 'APP_fatherLastName', 'APP_fatherAddress', 'APP_fatherContact', 'APP_fatherOccupation', 'APP_fatherMonthlyIncome',
                'APP_guardianFirstName', 'APP_guardianLastName', 'APP_guardianContact', 'APP_guardianAddress',
            ];

            const incompleteCount = useMemo(() => {
                let count = 0;
                requiredFields.forEach(field => {
                    // Skip guardian fields if strictly auto-filled
                    if (data.APP_guardianType !== 'OTHER' && field.startsWith('APP_guardian')) return;

                    const val = data[field];
                    // Special check for Income: Allow 0, disallow empty/NaN/negative
                    if (field.includes('MonthlyIncome')) {
                        if (val === '' || val === null || val === undefined || isNaN(parseFloat(val)) || parseFloat(val) < 0) count++;
                    } else {
                        if (!val || String(val).trim() === '') count++;
                    }
                });
                return count;
            }, [data, requiredFields]);

            const validate = () => {
                let tempErrors = {};
                let isValid = true;
                requiredFields.forEach(field => {
                    if (data.APP_guardianType !== 'OTHER' && field.startsWith('APP_guardian')) return;
                    if (!data[field] || String(data[field]).trim() === '') {
                        tempErrors[field] = 'Required.';
                        isValid = false;
                    }
                });
                // Email & Phone checks
                if (data.APP_emailAddress && !/\S+@\S+\.\S+/.test(data.APP_emailAddress)) { tempErrors.APP_emailAddress = 'Invalid Email'; isValid = false; }
                ['APP_motherContact', 'APP_fatherContact', 'APP_guardianContact'].forEach(f => {
                    if (data[f] && !/^\d{10,12}$/.test(data[f].replace(/\s/g, ''))) { tempErrors[f] = 'Invalid Phone'; isValid = false; }
                });
                setErrors(tempErrors);
                return isValid;
            };

            const handleChange = (e) => {
                const { name, value, type } = e.target;
                let newValue = value;
                if (type === 'text' || type === 'tel' || type === 'select-one') newValue = value.toUpperCase();
                else if (type === 'number') newValue = value === '' ? '' : parseInt(value);
                else if (type === 'currency') newValue = value; 

                setData(prev => ({ ...prev, [name]: newValue }));
                if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
            };

            // Enhanced Parent Change Handler: Syncs with Guardian fields instantly
            const handleParentChange = (e, parentType) => {
                const { name, value, type } = e.target;
                let newValue = value;
                if (type === 'text' || type === 'tel') newValue = value.toUpperCase();
                else if (type === 'number') newValue = value === '' ? '' : parseInt(value);
                else if (type === 'currency') newValue = value;

                setData(prevData => {
                    const newData = { ...prevData, [name]: newValue };
                    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));

                    // Live Sync: If Guardian Type matches this Parent, update Guardian field too
                    if (prevData.APP_guardianType === parentType) {
                        const mapping = {
                            FirstName: 'APP_guardianFirstName', MiddleName: 'APP_guardianMiddleName',
                            LastName: 'APP_guardianLastName', Contact: 'APP_guardianContact', Address: 'APP_guardianAddress'
                        };
                        Object.keys(mapping).forEach(suffix => {
                            if (name.endsWith(suffix)) newData[mapping[suffix]] = newValue;
                        });
                    }
                    return newData;
                });
            };

            // Enhanced Guardian Type Switcher: Safely copies data from latest state
            const handleGuardianTypeChange = (e) => {
                const type = e.target.value;
                
                setData(prevData => {
                    let updates = { 
                        APP_guardianType: type,
                        // Reset fields default
                        APP_guardianFirstName: '', APP_guardianMiddleName: '', 
                        APP_guardianLastName: '', APP_guardianContact: '', APP_guardianAddress: '' 
                    };

                    // If copying, pull directly from prevData to ensure freshness
                    if (type === 'MOTHER' || type === 'FATHER') {
                        const prefix = type === 'MOTHER' ? 'APP_mother' : 'APP_father';
                        updates.APP_guardianFirstName = prevData[`${prefix}FirstName`] || '';
                        updates.APP_guardianMiddleName = prevData[`${prefix}MiddleName`] || '';
                        updates.APP_guardianLastName = prevData[`${prefix}LastName`] || '';
                        updates.APP_guardianContact = prevData[`${prefix}Contact`] || '';
                        updates.APP_guardianAddress = prevData[`${prefix}Address`] || '';
                    }
                    
                    return { ...prevData, ...updates };
                });
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                if (!validate()) { alert('Please complete required fields.'); return; }
                setLoading(true);
                try {
                    const ref = window.doc(window.db, "dorm_applications", docId);
                    await window.updateDoc(ref, { ...reservationData, ...data, status: "PENDING", applicationSubmittedAt: window.serverTimestamp() });
                    onSuccess();
                } catch (err) { alert("Error: " + err.message); }
                finally { setLoading(false); }
            };

            const isManualGuardian = data.APP_guardianType === 'OTHER';

            return (
                <form onSubmit={handleSubmit} className="p-8 space-y-6 animate-fade">
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                        <h3 className="font-bold text-yellow-700 uppercase text-sm">Step 2: Official Application</h3>
                        <p className="text-xs text-yellow-600 uppercase">Reservation saved! Now please complete your personal records.</p>
                    </div>

                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Student Info (Cont.)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Student ID" name="APP_studentId" value={data.APP_studentId} onChange={handleChange} required error={errors.APP_studentId} placeholder="XXXX-X-XXXX"/>
                        <InputGroup label="Corporate Email" name="APP_emailAddress" value={data.APP_emailAddress} onChange={handleChange} required error={errors.APP_emailAddress}/>
                    </div>
                    <InputGroup label="Permanent Address" name="APP_address" value={data.APP_address} onChange={handleChange} required error={errors.APP_address}/>
                    <InputGroup label="Place of Birth" name="APP_pob" value={data.APP_pob} onChange={handleChange} required error={errors.APP_pob}/>

                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Mother's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup label="Last Name (Maiden Name)" name="APP_motherLastName" value={data.APP_motherLastName} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherLastName}/>
                        <InputGroup label="First Name" name="APP_motherFirstName" value={data.APP_motherFirstName} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherFirstName}/>
                        <InputGroup label="Middle Name" name="APP_motherMiddleName" value={data.APP_motherMiddleName} onChange={(e)=>handleParentChange(e, 'MOTHER')} error={errors.APP_motherMiddleName}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Occupation" name="APP_motherOccupation" value={data.APP_motherOccupation} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherOccupation}/>
                        <CurrencyInputGroup label="Monthly Income" name="APP_motherMonthlyIncome" value={data.APP_motherMonthlyIncome} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherMonthlyIncome}/>
                    </div>
                    <InputGroup label="Address" name="APP_motherAddress" value={data.APP_motherAddress} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherAddress}/>
                    <InputGroup label="Contact No." name="APP_motherContact" type="tel" value={data.APP_motherContact} onChange={(e)=>handleParentChange(e, 'MOTHER')} required error={errors.APP_motherContact}/>

                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Father's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup label="Last Name" name="APP_fatherLastName" value={data.APP_fatherLastName} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherLastName}/>
                        <InputGroup label="First Name" name="APP_fatherFirstName" value={data.APP_fatherFirstName} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherFirstName}/>
                        <InputGroup label="Middle Name" name="APP_fatherMiddleName" value={data.APP_fatherMiddleName} onChange={(e)=>handleParentChange(e, 'FATHER')} error={errors.APP_fatherMiddleName}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Occupation" name="APP_fatherOccupation" value={data.APP_fatherOccupation} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherOccupation}/>
                        <CurrencyInputGroup label="Monthly Income" name="APP_fatherMonthlyIncome" value={data.APP_fatherMonthlyIncome} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherMonthlyIncome}/>
                    </div>
                    <InputGroup label="Address" name="APP_fatherAddress" value={data.APP_fatherAddress} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherAddress}/>
                    <InputGroup label="Contact No." name="APP_fatherContact" type="tel" value={data.APP_fatherContact} onChange={(e)=>handleParentChange(e, 'FATHER')} required error={errors.APP_fatherContact}/>

                    <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Guardian</h4>
                    <div className="flex space-x-6 mb-4">
                        {['MOTHER', 'FATHER', 'OTHER'].map(t => (
                            <label key={t} className="inline-flex items-center">
                                <input type="radio" name="APP_guardianType" value={t} checked={data.APP_guardianType === t} onChange={handleGuardianTypeChange} className="form-radio text-blue-600"/>
                                <span className="ml-2 uppercase text-sm">{t}</span>
                            </label>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputGroup label="First Name" name="APP_guardianFirstName" value={data.APP_guardianFirstName} onChange={handleChange} required disabled={!isManualGuardian} error={errors.APP_guardianFirstName}/>
                            <InputGroup label="Middle Name" name="APP_guardianMiddleName" value={data.APP_guardianMiddleName} onChange={handleChange} disabled={!isManualGuardian}/>
                            <InputGroup label="Last Name" name="APP_guardianLastName" value={data.APP_guardianLastName} onChange={handleChange} required disabled={!isManualGuardian} error={errors.APP_guardianLastName}/>
                        </div>
                        <InputGroup label="Contact No." name="APP_guardianContact" value={data.APP_guardianContact} onChange={handleChange} required disabled={!isManualGuardian} error={errors.APP_guardianContact}/>
                        <InputGroup label="Address" name="APP_guardianAddress" value={data.APP_guardianAddress} onChange={handleChange} required disabled={!isManualGuardian} error={errors.APP_guardianAddress}/>
                    </div>

                    <div className="pt-6 border-t flex justify-between items-center">
                        <span className="text-xs text-gray-400 italic uppercase">Verify data before submitting.</span>
                        <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2 text-sm uppercase tracking-wider disabled:bg-gray-400">
                            {loading ? <i className="fas fa-spinner fa-spin"></i> : <span>Submit Application <i className="fas fa-paper-plane ml-1"></i></span>}
                        </button>
                    </div>
                </form>
            );
        }

        // --- COMPONENTS ---
        function InputGroup({ label, name, type="text", value, onChange, placeholder, required, disabled, error }) {
            const localOnChange = (e) => {
                let { value: val } = e.target;
                const synthetic = { target: { name, value: val.toUpperCase(), type } };
                if (type === 'number') { if (val === '' || /^\d+$/.test(val)) onChange(e); }
                else if (type === 'text' || type === 'tel') onChange(synthetic);
                else onChange(e);
            };
            return (
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</label>
                    <input type={type} name={name} value={value} onChange={localOnChange} placeholder={placeholder} disabled={disabled}
                        className={`w-full p-2 border rounded focus:outline-blue-500 transition-colors uppercase text-sm ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'} ${error ? 'border-red-500' : 'border-gray-300'}`}/>
                    {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
                </div>
            )
        }
        
        function SelectGroup({ label, name, value, onChange, required, disabled, error, children }) {
            return (
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</label>
                    <select name={name} value={value} onChange={onChange} disabled={disabled}
                        className={`w-full p-2 border rounded uppercase text-sm ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'} ${error ? 'border-red-500' : 'border-gray-300'}`}>{children}</select>
                    {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
                </div>
            )
        }

        function CurrencyInputGroup({ label, name, value, onChange, required, error, disabled }) {
            const [isEditing, setIsEditing] = useState(false);
            
            const formatCurrency = (val) => {
                if (val === '' || val === null || val === undefined) return '';
                if (val === '.') return '0.00';
                const num = parseFloat(val);
                return isNaN(num) ? '' : num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            };

            return (
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 font-bold">₱</span></div>
                        <input type="text" name={name} disabled={disabled}
                            value={isEditing ? value : formatCurrency(value)}
                            onFocus={() => setIsEditing(true)}
                            onBlur={() => setIsEditing(false)}
                            onChange={(e) => {
                                // Strip commas so user can type comfortably, but allow decimals
                                const val = e.target.value.replace(/,/g, '');
                                if (/^\d*\.?\d*$/.test(val)) onChange({ target: { name, value: val, type: 'currency' } });
                            }}
                            placeholder="0.00"
                            className={`w-full pl-8 p-2 border rounded focus:outline-blue-500 transition-colors uppercase text-sm ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100' : 'bg-gray-50'}`}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
