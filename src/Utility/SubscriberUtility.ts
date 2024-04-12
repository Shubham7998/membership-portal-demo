import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel'

export default function Subscriber(id : number) {
  const initialValue : SubscriberModel = {
      id: 0,
      firstName: '',
      contactNumber: '',
      email: '',
      genderId: 0
  }

  const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel>(initialValue);

  useEffect (() => {
    fetchData();
  }, [id])

}
function fetchData() {
    if(1 > 0){
        try{
            const result = "";
        }catch(error){

        }
    }
}

