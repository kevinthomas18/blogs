import axios from "axios";

export async function GET(req) {
  try {
    const response = await axios.get(
      'https://blogs-23vc.onrender.com/'
      // "http://www.thehappyhomes.com/getresources.aspx?MaxCount=103&StartId=100"
      // "http://www.thehappyhomes.com/getresources.aspx"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching data", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
