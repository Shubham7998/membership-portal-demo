import Swal from "sweetalert2";
import '../Style/Generic.css'

interface SwalResult {
    confirmed: boolean;
}

export const handleSwirl = (): Promise<SwalResult> => {
    return new Promise((resolve) => {
        Swal.fire({
            title: "Do you want delete the data?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            customClass: {
                popup: 'your-custom-class', // Define your custom class for overall style
                confirmButton: 'confirm-button-class', // Define custom class for confirm button
                denyButton: 'deny-button-class', // Define custom class for deny button
              },
            
            //  buttonsStyling: false, // Prevent default button styling
              cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                resolve({ confirmed: true });
            } else if (result.isDenied) {
                //Swal.fire("Changes are not saved", "", "info");
                resolve({ confirmed: false });
            }
        });
    });
};