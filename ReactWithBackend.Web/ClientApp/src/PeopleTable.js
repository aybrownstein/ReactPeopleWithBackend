import React from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = { 
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        isAdding: false
     }

     componentDidMount = () => {
axios.get('/api/people/getall').then(({data}) => {
    this.setState({people: data});
});
     }

     onTextChange = e => {
       const personCopy = {...this.state.person};
personCopy[e.target.name] = e.target.value;
this.setState({person: personCopy});
     }

     onAddClick = () => {
         this.setState({isAdding: true});
         axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({data}) => {
                this.setState({people: data,
                person: {firstName: '', lastName: '', age: ''},
            isAdding: false});
         });
     });
    }

    render() { 
        const {people, person, isAdding} = this.state;
        const {firstName, lastName, age} = person;
        return ( 
           <div className="container" style={{marginTop: 60}}>
               <AddPersonForm
               isAdding={isAdding}
               firstName={firstName}
               lastName={lastName}
               age={age}
               onFirstNameChange={this.onTextChange}
               onLastNameChange={this.onTextChange}
               onAgeChange={this.onTextChange}
               onAddClick={this.onAddClick}/>

               <div className="row mt-4">
                   <div className="col-md-2">
                       <table className="table table-striped table-bordered">
                           <thead>
                               <tr>
                                   <th>First Name</th>
                                   <th>Last Name</th>
                                   <th>Age</th>
                               </tr>
                           </thead>
                           <tbody>
                               {people.map(p => <PersonRow person={p} key={p.id}/>)}
                           </tbody>
                       </table>
                   </div>
               </div>
           </div> 

         );
    }
}
 
export default PeopleTable;