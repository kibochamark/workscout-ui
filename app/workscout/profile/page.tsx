
import { getAccount } from '@/app/data-access/actions/account.service'
import ChildrenWrapper from '@/components/WorkScoutLayout/ChildrenWrapper'
import { baseUrl } from '@/app/utils/constants'
import axios from 'axios'
import ProfileForm from '@/components/workscoutprofile/Profile-form'

const page = async () => {
  const acc = await getAccount()
  const customerid = acc.data.subscription.stripecustomerId ?? ''

  const userId = acc.data.kindeId 
  const { data: profile } = await axios.get(`${baseUrl}profile/${userId}`)

  return (
    <ChildrenWrapper>
      <div className="flex flex-col gap-2">
        <ProfileForm customerid={customerid} profile={profile} />
      </div>
    </ChildrenWrapper>
  )
}

export default page
