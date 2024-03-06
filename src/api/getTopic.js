import { hostname } from "../globals/hostname"

export const getTopic = async (topicId) => {
  try {
    const res = await fetch(`${hostname}/api/v1/topics/${topicId}`) 
    if(res.ok) {
      const data = await res.json()
      return data;
    }
    return {ok: false}
  } catch (err) {
    throw new Response("", {status: 500, statusText: "Get topic info failed"})
  } 
}
