import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useFormik } from "formik";
import { editProfile } from "../api/users";

const EditProfile = ({ user }) => {

  const queryClient = useQueryClient()

  const updateProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.username ]})
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const formik = useFormik({
    initialValues: {
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      cover_image: user.cover_image,
    },
    onSubmit: (values) => {

      const { name, bio, avatar, cover_image } = values
      const formData = new FormData()
      formData.append('name', name)
      formData.append('bio', bio)
      formData.append('avatar', avatar)
      formData.append('cover_image', cover_image)

      updateProfileMutation.mutate(formData)
    }
  })


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202327] h-[700px] w-[600px] rounded-md">

        <div className="flex min-h-full items-center justify-center sm:px-6 lg:px-8">
          <div className='m-1 p-1 '>
            <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">

              <div >
                <h2 className="mt-6 text-center text-3xl text-grey">
                  Edit Profile
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <input 
                  id='bio' name='bio'
                  onChange={formik.handleChange} value={formik.values.bio}
                  placeholder='About you'
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />

                <input placeholder='Your Name'
                  id='name' name='name'
                  onChange={formik.handleChange} value={formik.values.name}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />

                <input 
                  className="my-4"
                  type="file" name="avatar" onChange={(event) => formik.setFieldValue("avatar", event.currentTarget.files[0])} 
                />

                <input 
                  className="my-3"
                  type="file" name="cover_image" onChange={(event) => formik.setFieldValue("cover_image", event.currentTarget.files[0])} 
                />

                <button type='submit' className="bg-sky-700 mt-11  my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                  Save Changes
                </button>

              </form>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
