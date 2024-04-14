import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../Models/UserModel';
import { GetAllUserService, DeleteUserService } from '../Services/UserService';
import Swal from 'sweetalert2';
import '../Style/Generic.css'
import { handleSwirl } from '../Generics/Swirl';

export default function ShowUserUtility() {


    const initialValue: UserModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    }

    const [userInfo, setUserInfo] = useState<UserModel[]>([initialValue]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await GetAllUserService();
            console.log(result.data);
            setUserInfo(result.data);

        } catch (error) {
            console.log(error);
        }
    }

    // interface SwalResult {
    //     confirmed: boolean;
    // }

    // const handleSwirl = (): Promise<SwalResult> => {
    //     return new Promise((resolve) => {
    //         Swal.fire({
    //             title: "Do you want delete the data?",
    //             showDenyButton: true,
    //             confirmButtonText: "Yes",
    //             customClass: {
    //                 popup: 'your-custom-class', // Define your custom class for overall style
    //                 confirmButton: 'confirm-button-class', // Define custom class for confirm button
    //                 denyButton: 'deny-button-class', // Define custom class for deny button
    //               },
                
    //             //  buttonsStyling: false, // Prevent default button styling
    //               cancelButtonColor: '#3085d6'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 Swal.fire("Deleted!", "", "success");
    //                 resolve({ confirmed: true });
    //             } else if (result.isDenied) {
    //                 //Swal.fire("Changes are not saved", "", "info");
    //                 resolve({ confirmed: false });
    //             }
    //         });
    //     });
    // };

    async function handleDelete(id: number) {
        const confirmation = await handleSwirl();
        console.log(confirmation.confirmed)
        if (confirmation.confirmed) {
            const result = await DeleteUserService(id);
            console.log(result.data);
            fetchData();
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/user/${id}`)
    }
    return { handleDelete, userInfo, handleEdit }
}
