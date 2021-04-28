import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profile = ({ profile: { profiles, loading }, getProfiles }) => {
   useEffect(() => {
      getProfiles();
   }, [getProfiles]);
   
   return (
      <Fragment>
         {loading ? <Spinner /> : (
            <Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                  <i className="fab fa-connectdevelop"></i> Connect with Developers
               </p>
               {profiles.length > 0 
                  ? profiles.map(profile => (
                     <ProfileItem key={profile._id} profile={profile} />)) 
                  : <h4>No profiles found...</h4>}
            </Fragment>)
         }
      </Fragment>
   )
}
const mapStateToProps = state => ({ profile: state.profile });
export default connect(mapStateToProps, { getProfiles})(Profile);