import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteAuhtor } from "../../../../requests/author";
import { Button, Modal } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function authorList({ nameAuthor, id }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const hasToken = localStorage.getItem('token');
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const navigate = useNavigate();

    const deleteAuthor = async (e) => {
        e.preventDefault();

        try {
            await deleteAuhtor(id, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            if (isSubmitting) {
                return;
            }

            notifySuccess()

        } catch (error) {
            console.error('Error calling API:', error.message);
            notifyFail();
        }
    };

    const notifySuccess = () => {
        toast.success("Author delete", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                navigate(0)
            }
        });
    };

    const notifyFail = () => {
        toast.error("Erro for delete", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <>

            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        {nameAuthor}
                    </th>
                    {adminObject.admin == '1' && <td class="px-6 py-4">
                        <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" href={`/author/${id}/edit`}>Edit</a>
                    </td>}

                    {adminObject.admin == '1' && <td class="px-6 py-4">
                        <a class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer" onClick={() => setOpenModal(true)}>Delete</a>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this product?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={deleteAuthor}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </td>}
                </tr>

            </tbody>
        </>
    )
}