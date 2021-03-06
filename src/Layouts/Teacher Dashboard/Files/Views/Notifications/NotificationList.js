import React, { useState, useEffect }  from 'react'
import { Link, useHistory, useRouteMatch, useLocation, useParams  } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { getNotificationSpecific } from '../../Apis/apiForNotifications';

function NotificationListForTeacher() {
    let {id} = useParams()
    const [items, setItems] = useState([])

    useEffect(() => {
      const fetchItems = async function() {
        const contents = await getNotificationSpecific(id)
        setItems(contents)
      }
      fetchItems()
    }, []);
    var serialNumber = 0
    const history = useHistory()
    const location = useLocation();
    const handleOnClickDelete = (data) => {
      axios.delete('https://syntics.co/notifications/delete/' + data._id)
            .then((res) => {
                console.log('Student successfully deleted!')
                window.location.reload(false)
            }).catch((error) => {
                console.log(error)
            })
      
    }
    const handleOnClickView = (data) => {
      history.push({
        pathname:`/teacher/notification-answer/${id}`,
        state: data
      })
    }
    const handlingSerialNumber = () => {
      serialNumber = serialNumber + 1
      return(
          <td>{serialNumber}</td>
      )
  }
    return  (
        <>
       
        <div>
         {/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column mt-5 pt-4">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid mt-5">
    {/* Page Heading */}
    <h1 className='text-center display-4 my-3' style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}>Notifications</h1>
    
    {/* DataTales Example */}
    <div className="card align-middle justify-content-center m-auto shadow-sm  col-xl-10 col-lg-9 col-md-8  border-0 mb-4">
      <div className="my-3" style = {{color : "rgba(55, 64, 85, 0.9)"}}>
        <h5 className="mb-2 lead display-5 text-center" style={{ color:'rgba(55, 64, 85, 0.9)', fontWeight:'900' }}></h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="tableBlackDashboard table-bordered text-center"  width="100%" cellSpacing={0}>
          <thead>
                              <tr>
                              <th>Serial Number</th>
                              <th>Student Name</th>
                              <th>Student Email</th>
                              <th>Query Title</th>
                              
                              </tr>
                          </thead>
                          <tbody>
                              {
                              items.map(contents => (
                                  <tr key={contents._id}>
                                     {handlingSerialNumber()}
                                  <td>
                                  <Link to={{
                                        pathname: `/teacher/notification-answer/${id}`,
                                        state: contents,
                                      }} className = "text-dark">
                                      {contents.studentName}</Link>
                                  </td>
                                  <td>
                                  <Link to={{
                                        pathname: `/teacher/notification-answer/${id}`,
                                        state: contents,
                                      }} className = "text-dark">
                                      {contents.studentEmail}</Link>
                                  </td>
                                  <td>
                                  <Link to={{
                                        pathname: `/teacher/notification-answer/${id}`,
                                        state: contents,
                                      }} className = "text-dark">
                                      {contents.testimonialTitle}</Link>
                                  </td>

                                  </tr>
                              ))
                              }
                          </tbody>        
          </table>
        </div>
      </div>
    </div>
  </div>

  {/* /.containerBlackDashboard-fluid */}
</div>
{/* End of Main Content */}
{/* Footer */}
<footer className="sticky-footer bg-transparent">
  <div className="containerBlackDashboard my-auto">
    <div className="copyright text-center my-auto">
      <span></span>
    </div>
  </div>
</footer>
{/* End of Footer */}
</div>
{/* End of Content Wrapper */}
{/* End of Page Wrapper */}
        </div>
      </>
    )
}

export default NotificationListForTeacher
