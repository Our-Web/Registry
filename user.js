import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- FIREBASE CONFIG ---
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

// --- REACT LOGIC ---
const { useState, useMemo } = React;

// --- COLLEGE & COURSE DATA MAPPING ---
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

// --- MAIN APP COMPONENT ---
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
                <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">Dormitory Portal</h1>
                <p className="text-gray-500 uppercase text-xs tracking-widest mt-2">Office of the Vice President for Finance and Administration</p>
            </div>

            {/* Progress Bar */}
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
                    <ReservationForm 
                        onSuccess={handleReservationSuccess} 
                        loading={isLoading} 
                        setLoading={setIsLoading} 
                    />
                )}

                {step === 2 && (
                    <ApplicationForm 
                        docId={documentId} 
                        reservationData={reservationData} 
                        onSuccess={handleApplicationSuccess}
                        loading={isLoading} 
                        setLoading={setIsLoading}
                    />
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

// --- STEP 1: RESERVATION FORM ---
function ReservationForm({ onSuccess, loading, setLoading }) {
    const [data, setData] = useState({
        RES_resFirstName: '',
        RES_resMiddleName: '',
        RES_resLastName: '',
        RES_college: '',
        RES_course: '',
        RES_yearLevel: '',
        RES_dormPreference: '', 
        RES_phone: '',
        RES_prospectedStayDate: ''
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

        if (e.target.type !== 'date') {
            newValue = value.toUpperCase();
        }

        if (name === 'RES_resFirstName') {
            const firstLetter = newValue.charAt(0);
            const suggestedDorm = ['A', 'E', 'I', 'O', 'U'].includes(firstLetter) ? 'FEMALE DORM' : 'MALE DORM';
            
            setData(prev => ({ 
                ...prev, 
                [name]: newValue, 
                RES_dormPreference: suggestedDorm 
            }));
        } else {
            setData(prev => ({ 
                ...prev, 
                [name]: newValue 
            }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCollegeChange = (e) => {
        const newCollege = e.target.value;
        setData({ 
            ...data, 
            RES_college: newCollege,
            RES_course: ""
        });
        if (errors.RES_college) setErrors(prev => ({ ...prev, RES_college: null, RES_course: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            alert('Please correct the highlighted errors before proceeding.');
            return;
        }
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "dorm_applications"), {
                ...data,
                status: "RESERVED (INCOMPLETE)", 
                createdAt: serverTimestamp()
            });
            onSuccess(docRef.id, data); 
        } catch (error) {
            alert("Error saving reservation: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const availableCourses = data.RES_college ? COLLEGE_DATA[data.RES_college] : [];

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-bold text-blue-700 uppercase text-sm">Step 1: Reservation Details</h3>
                <p className="text-xs text-blue-600 uppercase">Please provide your basic details to secure a slot preference.</p>
            </div>

            {/* Applicant Name Fields */}
            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Applicant Name</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputGroup type="Text" label="Last Name" name="RES_resLastName" value={data.RES_resLastName} onChange={handleChange} required error={errors.RES_resLastName}/>
                    <InputGroup type="Text" label="First Name" name="RES_resFirstName" value={data.RES_resFirstName} onChange={handleChange} required error={errors.RES_resFirstName}/>
                <InputGroup type="Text" label="Middle Name" name="RES_resMiddleName" value={data.RES_resMiddleName} onChange={handleChange} error={errors.RES_resMiddleName}/>
            </div>

            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Enrollment & Contact Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <SelectGroup 
                    label="College" 
                    name="RES_college" 
                    value={data.RES_college} 
                    onChange={handleCollegeChange} 
                    required 
                    error={errors.RES_college}
                >
                    <option value="">SELECT COLLEGE</option>
                    {Object.keys(COLLEGE_DATA).map(collegeName => (
                        <option key={collegeName} value={collegeName}>{collegeName}</option>
                    ))}
                </SelectGroup>

                <SelectGroup 
                    label="Course" 
                    name="RES_course" 
                    value={data.RES_course} 
                    onChange={handleChange} 
                    required 
                    error={errors.RES_course}
                    disabled={!data.RES_college}
                >
                    <option value="">{data.RES_college ? "SELECT COURSE" : "SELECT COLLEGE FIRST"}</option>
                    {availableCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                    ))}
                </SelectGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectGroup 
                    label="Year Level" 
                    name="RES_yearLevel" 
                    value={data.RES_yearLevel} 
                    onChange={handleChange} 
                    required 
                    error={errors.RES_yearLevel}
                >
                    <option value="">SELECT YEAR</option>
                    <option value="1ST YEAR">1ST YEAR</option>
                    <option value="2ND YEAR">2ND YEAR</option>
                    <option value="3RD YEAR">3RD YEAR</option>
                    <option value="4TH YEAR">4TH YEAR</option>
                </SelectGroup>
                <SelectGroup 
                    label="Dorm Preference (Auto-suggested)" 
                    name="RES_dormPreference" 
                    value={data.RES_dormPreference} 
                    onChange={handleChange} 
                    required 
                    error={errors.RES_dormPreference}
                >
                    <option value="MALE DORM">MALE DORM</option>
                    <option value="FEMALE DORM">FEMALE DORM</option>
                    <option value="FOREIGN DORM">FOREIGN DORM</option>
                    <option value="ANGAT BUHAY DORM">ANGAT BUHAY DORM</option>
                </SelectGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup 
                    label="Mobile Number (e.g. 0917XXXXXXX)" 
                    name="RES_phone" 
                    type="text" 
                    value={data.RES_phone}
                    onChange={handleChange} 
                    required
                    error={errors.RES_phone}
                />
                <InputGroup 
                    label="Start Date of Stay" 
                    name="RES_prospectedStayDate" 
                    type="date" 
                    value={data.RES_prospectedStayDate} 
                    onChange={handleChange} 
                    required 
                    error={errors.RES_prospectedStayDate}
                />
            </div>

            <div className="pt-4 border-t flex justify-end">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 text-sm uppercase tracking-wider disabled:bg-gray-400">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : <span>Proceed to Application <i className="fas fa-arrow-right ml-1"></i></span>}
                </button>
            </div>
        </form>
    );
}

// --- STEP 2: APPLICATION FORM ---
function ApplicationForm({ docId, reservationData, onSuccess, loading, setLoading }) {
    
    const initialAppState = {
        APP_studentId: '',
        APP_emailAddress: '',
        APP_address: '',
        APP_pob: '', 
        
        // --- PARENT/MOTHER DETAILS ---
        APP_motherFirstName: '',
        APP_motherMiddleName: '',
        APP_motherLastName: '',
        APP_motherAddress: '',
        APP_motherContact: '',
        APP_motherOccupation: '',
        APP_motherMonthlyIncome: '', 
        
        // --- PARENT/FATHER DETAILS ---
        APP_fatherFirstName: '',
        APP_fatherMiddleName: '',
        APP_fatherLastName: '',
        APP_fatherAddress: '',
        APP_fatherContact: '',
        APP_fatherOccupation: '',
        APP_fatherMonthlyIncome: '', 

        // --- GUARDIAN DETAILS ---
        APP_guardianType: 'MOTHER', 
        APP_guardianFirstName: '',
        APP_guardianMiddleName: '',
        APP_guardianLastName: '',
        APP_guardianContact: '',
        APP_guardianAddress: ''
    };

    const [data, setData] = useState(initialAppState);
    const [errors, setErrors] = useState({});
    
    const requiredFields = [
        'APP_studentId', 'APP_emailAddress', 'APP_address', 'APP_pob', 
        'APP_motherFirstName', 'APP_motherLastName', 'APP_motherAddress', 'APP_motherContact', 'APP_motherOccupation', 'APP_motherMonthlyIncome',
        'APP_fatherFirstName', 'APP_fatherLastName', 'APP_fatherAddress', 'APP_fatherContact', 'APP_fatherOccupation', 'APP_fatherMonthlyIncome',
        'APP_guardianFirstName', 'APP_guardianLastName', 'APP_guardianContact', 'APP_guardianAddress',
    ];

    const incompleteCount = useMemo(() => {
        const currentData = { ...data };

        if (data.APP_guardianType !== 'OTHER') {
            const guardianFields = ['APP_guardianFirstName', 'APP_guardianLastName', 'APP_guardianContact', 'APP_guardianAddress'];
            requiredFields.forEach(field => {
                if (guardianFields.includes(field)) {
                    delete currentData[field];
                }
            });
        }

        return requiredFields.filter(field => {
            const value = currentData[field];
            if (field === 'APP_motherMonthlyIncome' || field === 'APP_fatherMonthlyIncome') {
                // Check if valid number > 0
                return !value || isNaN(parseFloat(value)) || parseFloat(value) <= 0;
            }
            return !value || String(value).trim() === '';
        }).length;
    }, [data]);
    
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        requiredFields.forEach(field => {
            if (data.APP_guardianType !== 'OTHER' && 
                ['APP_guardianFirstName', 'APP_guardianLastName', 'APP_guardianContact', 'APP_guardianAddress'].includes(field)) {
                return;
            }
            
            const value = data[field];
            if (!value || String(value).trim() === '') {
                tempErrors[field] = 'This field is required.';
                isValid = false;
            }
        });
        
        if (data.APP_emailAddress && !/\S+@\S+\.\S+/.test(data.APP_emailAddress.toLowerCase())) {
            tempErrors.APP_emailAddress = 'Invalid email format.';
            isValid = false;
        }
        
        if (data.APP_motherContact && !/^\d{10,12}$/.test(data.APP_motherContact.replace(/\s/g, ''))) {
            tempErrors.APP_motherContact = 'Valid phone required (10-12 digits).';
            isValid = false;
        }
        if (data.APP_fatherContact && !/^\d{10,12}$/.test(data.APP_fatherContact.replace(/\s/g, ''))) {
            tempErrors.APP_fatherContact = 'Valid phone required (10-12 digits).';
            isValid = false;
        }
        if (data.APP_guardianContact && !data.APP_guardianContact.startsWith('09') && !/^\d{10,12}$/.test(data.APP_guardianContact.replace(/\s/g, ''))) {
            tempErrors.APP_guardianContact = 'Valid phone required (10-12 digits).';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;
        if (type === 'text' || type === 'tel' || type === 'select-one') {
            newValue = value.toUpperCase();
        } else if (type === 'number') {
            newValue = value === '' ? '' : parseInt(value);
        } else if (type === 'currency') {
            // For currency, we keep the string value (digits + dots) to avoid cursor jumping
            newValue = value;
        }

        setData(prevData => ({ ...prevData, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    const handleGuardianTypeChange = (e) => {
        const newType = e.target.value;
        let newGuardianData = {
            APP_guardianType: newType,
            APP_guardianFirstName: '',
            APP_guardianMiddleName: '',
            APP_guardianLastName: '',
            APP_guardianContact: '',
            APP_guardianAddress: ''
        };

        if (newType === 'MOTHER') {
            newGuardianData.APP_guardianFirstName = data.APP_motherFirstName;
            newGuardianData.APP_guardianMiddleName = data.APP_motherMiddleName;
            newGuardianData.APP_guardianLastName = data.APP_motherLastName;
            newGuardianData.APP_guardianContact = data.APP_motherContact;
            newGuardianData.APP_guardianAddress = data.APP_motherAddress;
        } else if (newType === 'FATHER') {
            newGuardianData.APP_guardianFirstName = data.APP_fatherFirstName;
            newGuardianData.APP_guardianMiddleName = data.APP_fatherMiddleName;
            newGuardianData.APP_guardianLastName = data.APP_fatherLastName;
            newGuardianData.APP_guardianContact = data.APP_fatherContact;
            newGuardianData.APP_guardianAddress = data.APP_fatherAddress;
        }

        setData(prevData => ({
            ...prevData,
            ...newGuardianData
        }));
    };

    const handleParentChange = (e, parentType) => {
        const { name, value, type } = e.target;
        let newValue = value;
        
        if (type === 'text' || type === 'tel') {
            newValue = value.toUpperCase();
        } else if (type === 'number') {
            newValue = value === '' ? '' : parseInt(value);
        } else if (type === 'currency') {
            newValue = value; // Keep string for currency during editing
        }
        
        setData(prevData => {
            const newData = { ...prevData, [name]: newValue };
            
            if (errors[name]) {
                setErrors(prev => ({ ...prev, [name]: null }));
            }

            if (prevData.APP_guardianType === parentType) {
                const fieldMap = {
                    [`APP_${parentType.toLowerCase()}FirstName`]: 'APP_guardianFirstName',
                    [`APP_${parentType.toLowerCase()}MiddleName`]: 'APP_guardianMiddleName',
                    [`APP_${parentType.toLowerCase()}LastName`]: 'APP_guardianLastName',
                    [`APP_${parentType.toLowerCase()}Contact`]: 'APP_guardianContact',
                    [`APP_${parentType.toLowerCase()}Address`]: 'APP_guardianAddress',
                };

                const guardianField = fieldMap[name];
                if (guardianField) {
                    newData[guardianField] = newValue;
                }
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            alert('Please correct the highlighted errors before submitting.');
            return;
        }
        setLoading(true);
        try {
            const recordRef = doc(db, "dorm_applications", docId);
            
            const appDataForUpdate = {
                ...reservationData, 
                ...data, 
                status: "PENDING", 
                applicationSubmittedAt: serverTimestamp()
            };

            await updateDoc(recordRef, appDataForUpdate);
            onSuccess();
        } catch (error) {
            alert("Error saving application: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const isGuardianManualInput = data.APP_guardianType === 'OTHER';

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-6 animate-fade">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <h3 className="font-bold text-yellow-700 uppercase text-sm">Step 2: Official Application</h3>
                <p className="text-xs text-yellow-600 uppercase">Reservation saved! Now please complete your personal records.</p>
                    <p className="text-xs text-red-500 font-bold mt-2">
                    <i className="fas fa-exclamation-triangle mr-1"></i> {incompleteCount} REQUIRED FIELDS INCOMPLETE.
                </p>
            </div>

            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 tracking-widest">Student Information (Cont.)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Student ID Number" name="APP_studentId" value={data.APP_studentId} onChange={handleChange} placeholder="XXXX-X-XXXX" required error={errors.APP_studentId} />
                <InputGroup label="Email Address" name="APP_emailAddress" type="text" value={data.APP_emailAddress} onChange={handleChange} required error={errors.APP_emailAddress} />
            </div>
            
            <InputGroup label="Permanent Address" name="APP_address" value={data.APP_address} onChange={handleChange} required error={errors.APP_address} />
            <InputGroup label="Place of Birth" name="APP_pob" value={data.APP_pob} onChange={handleChange} required error={errors.APP_pob} />

            {/* --- MOTHER'S DETAILS --- */}
            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Mother's Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputGroup label="First Name" name="APP_motherFirstName" value={data.APP_motherFirstName} onChange={(e) => handleParentChange(e, 'MOTHER')} required error={errors.APP_motherFirstName} />
                <InputGroup label="Middle Name" name="APP_motherMiddleName" value={data.APP_motherMiddleName} onChange={(e) => handleParentChange(e, 'MOTHER')} error={errors.APP_motherMiddleName} />
                <InputGroup label="Last Name" name="APP_motherLastName" value={data.APP_motherLastName} onChange={(e) => handleParentChange(e, 'MOTHER')} required error={errors.APP_motherLastName} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Occupation" name="APP_motherOccupation" value={data.APP_motherOccupation} onChange={(e) => handleParentChange(e, 'MOTHER')} required error={errors.APP_motherOccupation} />
                
                {/* --- NEW CURRENCY INPUT FOR MOTHER --- */}
                <CurrencyInputGroup 
                    label="Monthly Income" 
                    name="APP_motherMonthlyIncome" 
                    value={data.APP_motherMonthlyIncome} 
                    onChange={(e) => handleParentChange(e, 'MOTHER')} 
                    required 
                    error={errors.APP_motherMonthlyIncome} 
                />
            </div>
            <InputGroup label="Complete Address" name="APP_motherAddress" value={data.APP_motherAddress} onChange={(e) => handleParentChange(e, 'MOTHER')} required error={errors.APP_motherAddress} />
            <InputGroup label="Contact Number" name="APP_motherContact" type="tel" value={data.APP_motherContact} onChange={(e) => handleParentChange(e, 'MOTHER')} required error={errors.APP_motherContact} />

            {/* --- FATHER'S DETAILS --- */}
            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Father's Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputGroup label="First Name" name="APP_fatherFirstName" value={data.APP_fatherFirstName} onChange={(e) => handleParentChange(e, 'FATHER')} required error={errors.APP_fatherFirstName} />
                <InputGroup label="Middle Name" name="APP_fatherMiddleName" value={data.APP_fatherMiddleName} onChange={(e) => handleParentChange(e, 'FATHER')} error={errors.APP_fatherMiddleName} />
                <InputGroup label="Last Name" name="APP_fatherLastName" value={data.APP_fatherLastName} onChange={(e) => handleParentChange(e, 'FATHER')} required error={errors.APP_fatherLastName} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Occupation" name="APP_fatherOccupation" value={data.APP_fatherOccupation} onChange={(e) => handleParentChange(e, 'FATHER')} required error={errors.APP_fatherOccupation} />
                
                {/* --- NEW CURRENCY INPUT FOR FATHER --- */}
                <CurrencyInputGroup 
                    label="Monthly Income" 
                    name="APP_fatherMonthlyIncome" 
                    value={data.APP_fatherMonthlyIncome} 
                    onChange={(e) => handleParentChange(e, 'FATHER')} 
                    required 
                    error={errors.APP_fatherMonthlyIncome} 
                />
            </div>
            <InputGroup label="Complete Address" name="APP_fatherAddress" value={data.APP_fatherAddress} onChange={(e) => handleParentChange(e, 'FATHER')} required error={errors.APP_fatherAddress} />
            <InputGroup label="Contact Number" name="APP_fatherContact" type="tel" value={data.APP_fatherContact} onChange={(e) => handleParentChange(e, 'FATHER')} required error={errors.APP_fatherContact} />

            {/* --- EMERGENCY CONTACT / GUARDIAN --- */}
            <h4 className="font-bold text-gray-400 uppercase text-xs border-b pb-2 pt-4 tracking-widest">Emergency Contact / Guardian</h4>
            
            {/* Guardian Type Selection */}
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Designate Guardian <span className="text-red-500">*</span></label>
                <div className="flex space-x-6">
                    <label className="inline-flex items-center">
                        <input 
                            type="radio" 
                            name="APP_guardianType" 
                            value="MOTHER" 
                            checked={data.APP_guardianType === 'MOTHER'} 
                            onChange={handleGuardianTypeChange}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 uppercase text-sm">Mother</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input 
                            type="radio" 
                            name="APP_guardianType" 
                            value="FATHER" 
                            checked={data.APP_guardianType === 'FATHER'} 
                            onChange={handleGuardianTypeChange}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 uppercase text-sm">Father</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input 
                            type="radio" 
                            name="APP_guardianType" 
                            value="OTHER" 
                            checked={data.APP_guardianType === 'OTHER'} 
                            onChange={handleGuardianTypeChange}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2 uppercase text-sm">Other</span>
                    </label>
                </div>
            </div>

            <div className="bg-gray-50 p-4 border rounded-lg space-y-4">
                <p className="text-xs text-gray-500 italic uppercase">Details below are **{isGuardianManualInput ? 'MANUAL INPUT' : 'AUTO-FILLED'}** based on selection above.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGroup 
                        label="Guardian First Name" 
                        name="APP_guardianFirstName" 
                        value={data.APP_guardianFirstName} 
                        onChange={handleChange} 
                        required 
                        disabled={!isGuardianManualInput}
                        error={errors.APP_guardianFirstName}
                    />
                    <InputGroup 
                        label="Guardian Middle Name" 
                        name="APP_guardianMiddleName" 
                        value={data.APP_guardianMiddleName} 
                        onChange={handleChange} 
                        disabled={!isGuardianManualInput}
                    />
                    <InputGroup 
                        label="Guardian Last Name" 
                        name="APP_guardianLastName" 
                        value={data.APP_guardianLastName} 
                        onChange={handleChange} 
                        required 
                        disabled={!isGuardianManualInput}
                        error={errors.APP_guardianLastName}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup 
                        label="Guardian Contact No." 
                        name="APP_guardianContact" 
                        type="tel"
                        value={data.APP_guardianContact} 
                        onChange={handleChange} 
                        required 
                        disabled={!isGuardianManualInput}
                        error={errors.APP_guardianContact}
                    />
                    <div></div> 
                </div>
                <InputGroup 
                    label="Guardian Address" 
                    name="APP_guardianAddress" 
                    value={data.APP_guardianAddress} 
                    onChange={handleChange} 
                    required 
                    disabled={!isGuardianManualInput}
                    error={errors.APP_guardianAddress}
                />
            </div>
            {/* End Guardian Details */}

            <div className="pt-6 border-t flex justify-between items-center">
                <span className="text-xs text-gray-400 italic uppercase">By clicking Submit, you certify data is correct.</span>
                <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2 text-sm uppercase tracking-wider disabled:bg-gray-400">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : <span>Submit Final Application <i className="fas fa-paper-plane ml-1"></i></span>}
                </button>
            </div>
        </form>
    );
}

// --- COMPONENT: Text/Number Inputs ---
function InputGroup({ label, name, type="text", value, onChange, placeholder, required, disabled, error }) {
    
    const localOnChange = (e) => {
        let { value: inputValue } = e.target;
        
        if (type === 'text' || type === 'tel') {
            // FIXED: Do not spread ...e or ...e.target
            const syntheticEvent = {
                target: {
                    name: name,
                    value: inputValue.toUpperCase(),
                    type: type
                }
            };
            onChange(syntheticEvent);
        } else if (type === 'number') {
            if (inputValue === '' || /^\d+$/.test(inputValue)) {
                onChange(e);
            }
        } else {
            onChange(e); 
        }
    };

    return (
        <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={localOnChange} 
                placeholder={placeholder}
                required={false}
                disabled={disabled}
                className={`w-full p-2 border rounded focus:outline-blue-500 transition-colors uppercase text-sm ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'} ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
        </div>
    )
}

// --- COMPONENT: Select Inputs ---
function SelectGroup({ label, name, value, onChange, required, disabled, error, children }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select 
                name={name} 
                value={value} 
                onChange={onChange} 
                required={false}
                disabled={disabled}
                className={`w-full p-2 border rounded uppercase text-sm ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'} focus:outline-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`} 
            >
                {children}
            </select>
            {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
        </div>
    )
}

// --- COMPONENT: Currency Input (with Peso Sign & Formatting) ---
function CurrencyInputGroup({ label, name, value, onChange, required, error }) {
    const [isEditing, setIsEditing] = useState(false);

    // Format number to: 1,000.00
    const formatCurrency = (val) => {
        if (val === '' || val === null || val === undefined) return '';
        const num = parseFloat(val);
        if (isNaN(num)) return '';
        return num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">₱</span>
                </div>
                <input
                    type="text"
                    name={name}
                    // Show raw value when editing, formatted value when not
                    value={isEditing ? value : formatCurrency(value)}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                    onChange={(e) => {
                        // Allow only numbers and one decimal point
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) {
                            // Create a synthetic event to pass back to parent
                            onChange({ target: { name, value: val, type: 'currency' } }); 
                        }
                    }}
                    placeholder="0.00"
                    className={`w-full pl-8 p-2 border rounded focus:outline-blue-500 transition-colors uppercase text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);