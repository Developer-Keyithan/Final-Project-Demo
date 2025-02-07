import React, { useState, useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { BiCamera } from 'react-icons/bi';
import { MdEdit, MdSave } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Image from 'next/image';


interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  mobileNumber: string[];
  profileImage: string;
}


const Profile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const [close, setClose] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(true);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isImage, setIsImage] = useState(true);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isMobileNumberEdit, setIsMobileNumberEdit] = useState(false);

  const [editedEmail, setEditedEmail] = useState('');
  const [editedMobileNumber, setEditedMobileNumber] = useState('');

  const router = useRouter();

  const handleLogin = () => router.push('/login');
  const handleSignup = () => router.push('/signup');
  const handleLogout = () => {
    setIsVisibleConfirm(true)
    setIsLogoutVisible(false)
  };

  const handleYes = async () => {
    try {
      const response = await axios.post('/api/user/logout');
      if (response.status === 200) {
        toast.success('Logout Successful');
        setIsLogoutVisible(false);
        setClose(true);
      } else {
        toast.error('Oops! Logout Failed.');
      }
      setIsVisibleConfirm(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleNo = () => {
    setIsVisibleConfirm(false)
    setIsLogoutVisible(true)
  };
  const handleClose = () => setClose(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        setId(data?.user?.id)
        if (isMounted) {
          const response = await axios.post('/api/user/get-user', { userId: data.user.id, newEmail: editedEmail });
          const fetchedUser = response.data.user;
          setUser(fetchedUser);
          setEditedEmail(fetchedUser.email);
          setEditedMobileNumber(fetchedUser.mobileNumber.join(', '));
          setError(null);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (isMounted) {
          setError(axiosError.message || 'Failed to fetch user data');
          setUser(null);
        }
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEmailEdit = () => setIsEmailEdit(true);
  const handleMobileNumberEdit = () => setIsMobileNumberEdit(true);

  const handleSaveEditedEmail = async () => {
    try {
      const response = await axios.put('/api/user', { userId: id, newEmail: editedEmail });
      if (response.status === 200 && user) {
        setUser({ ...user, email: editedEmail });
        toast.success('Email updated.');
        setIsEmailEdit(false);
      } else {
        toast.error('Failed to update.');
      }
    } catch (error) {
      toast.error((error as AxiosError).message);
    } finally {
      setIsEmailEdit(false);
    }
  };

  const handleSaveEditedMobileNumber = async () => {
    try {
      const response = await axios.put('/api/user', { userId: id, newMobileNumber: editedMobileNumber.split(', ') });
      if (response.status === 200 && user) {
        setUser({ ...user, mobileNumber: editedMobileNumber.split(', ') });
        toast.success('Mobile number updated.');
        setIsMobileNumberEdit(false);
      } else {
        toast.error('Failed to update.');
      }
    } catch (error) {
      toast.error((error as AxiosError).message);
    } finally {
      setIsMobileNumberEdit(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files) return;
  //   const file = files[0];
  //   if (file) {
  //     const objectUrl = URL.createObjectURL(file);
  //     setPreview(objectUrl);
  //     setImageName(file.name)
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!file) return;

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await fetch('/api/s3-upload' ,{
            method: 'POST',
            body: formData
        })

        const data = await response.json();
        console.log(response.status)
        setUploading(false)
        
    } catch (error) {
        console.log(error)
        setUploading(false)
    }
}


  if (close) return null;

  if (!user) {
    return (
      <div className="absolute top-12 right-0 bg-white p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1 className="font-medium text-lg mb-4">Authentication failed! So</h1>
        <div className="w-max flex justify-between items-center gap-6">
          <button
            onClick={handleLogin}
            className="bg-primaryColor py-2 px-8 font-semibold rounded-sm text-white hover:bg-primaryButtonHoverColor transition ease-in-out duration-300"
          >
            Login
          </button>
          or
          <button
            onClick={handleSignup}
            className="bg-primaryColor py-2 px-8 font-semibold rounded-sm text-white hover:bg-primaryButtonHoverColor transition ease-in-out duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const nameLogo = `${user.firstName[0]}${user.lastName[0]}`;
  const profileImage = user.profileImage;
  const name = `${user.firstName} ${user.lastName}`;
  const email = user.email;
  const phone = user.mobileNumber;

  return (
    <div className="w-max absolute rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20 overflow-hidden">
      <div className="max-fit mx-auto bg-white rounded-md p-4 relative">
        <div className="flex flex-col items-center gap-5 mt-7">
          <div className="relative">
            {isImage ? (
              <div className="flex items-center justify-center border-[1px] bg-primaryColor rounded-full p-8 cursor-pointer h-40 w-40">
                <p className="font-semibold mt-1 text-[60px] text-white">{nameLogo}</p>
              </div>
            ) : (
              <div className="text-center border-[1px] border-black rounded-full p-2 w-fit cursor-pointer">
                <Image src={profileImage} alt="" className="text-[100px]" />
              </div>
            )}
            <button className="absolute bottom-1 right-1 bg-white text-primaryColor ring-1 ring-primaryColor rounded-full p-2 text-[20px] hover:bg-primaryColor hover:ring-white hover:text-white transition ease-in-out duration-300 cursor-pointer">
                <BiCamera />
            </button>
            {/* <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" disabled={!file || uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form> */}


          </div>
          <p className="font-semibold">{name}</p>
          <button
            className="absolute top-[8px] right-[8px] text-xl hover:bg-red-800 hover:text-white rounded-full transition ease-in-out duration-300 p-[1px]"
            onClick={handleClose}
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-5 relative">
          <div className="flex justify-between items-center gap-5 w-full border-[1px] py-[5px] px-[10px] rounded-sm">
            <div className="flex gap-1">
              <p className="font-semibold">E-mail:</p>
              {!isEmailEdit ? (
                <p>{email}</p>
              ) : (
                <input
                  className='ring-1 ring-primaryColor w-60 rounded-sm focus:ring-2 transition ease-in-out duration-300 outline-none'
                  type="email"
                  placeholder={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              )}
            </div>
            <div className="hover:bg-green-800 p-1 text-lg cursor-pointer rounded-sm hover:text-white -mr-[5px] transition ease-in-out duration-300">
              {!isEmailEdit ? (
                <MdEdit onClick={handleEmailEdit} />
              ) : (
                <MdSave onClick={handleSaveEditedEmail} />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-5 w-full border-[1px] py-[5px] px-[10px] rounded-sm">
            <div className="flex gap-1">
              <p className="font-semibold">Mobile Number:</p>
              {!isMobileNumberEdit ? (
                <p>+94 {phone}</p>
              ) : (
                <input
                  className='ring-1 ring-primaryColor w-60 rounded-sm focus:ring-2 transition ease-in-out duration-300 outline-none'
                  type="text"
                  placeholder={editedMobileNumber}
                  onChange={(e) => setEditedMobileNumber(e.target.value)}
                />
              )}
            </div>
            <div className="hover:bg-green-800 p-1 text-lg cursor-pointer rounded-sm hover:text-white -mr-[5px] transition ease-in-out duration-300">
              {!isMobileNumberEdit ? (
                <MdEdit onClick={handleMobileNumberEdit} />
              ) : (
                <MdSave onClick={handleSaveEditedMobileNumber} />
              )}
            </div>
          </div>

          {isLogoutVisible && (
            <button
              className="bg-red-700 hover:bg-red-800 text-white rounded-sm px-2 py-1 mt-2 transition ease-in-out duration-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {isVisibleConfirm && (
            <div className="bg-gray-100 p-4 border rounded-sm">
              <p>Are you sure you want to log out?</p>
              <div className="flex gap-4 mt-2 justify-between">
                <button
                  className="bg-red-700 text-white hover:bg-red-800 rounded-sm w-full py-1 transition ease-in-out duration-500"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <button
                  className="bg-primaryColor text-white hover:bg-primaryButtonColor rounded-sm w-full py-1 transition ease-in-out duration-500"
                  onClick={handleNo}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;