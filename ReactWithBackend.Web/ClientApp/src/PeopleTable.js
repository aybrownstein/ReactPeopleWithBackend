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
        currentEditPersonId: '',
        isEditMode: false
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
         
         axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({data}) => {
                this.setState({people: data,
                person: {firstName: '', lastName: '', age: ''}
            });
         });
     });
    }

    onEditClick = person => {
        this.setState({ person, isEditMode: true, currentEditPersonId: person.id });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', { ...this.state.person, id: this.state.currentEditPersonId }).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' }
                });
            });
        });
    }

    resetToAddMode = () => {
        this.setState({
            isEditMode: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            currentEditPersonId: 0
        })
    }

    onCancelClick = () => {
        this.resetToAddMode();
    }

    onDeleteClick = id => {
        axios.post('/api/people/delete', { id }).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' }
                });
            });
        });
    }

    render() { 
        const {people, person} = this.state;
        const {firstName, lastName, age} = person;
        return ( 
           <div className="container" style={{marginTop: 60}}>
               <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                    isEditMode={this.state.isEditMode}     />

               <div className="row mt-4">
                   <div className="col-md-2">
                       <table className="table table-striped table-bordered">
                           <thead>
                               <tr>
                                   <th>First Name</th>
                                   <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                               </tr>
                           </thead>
                           <tbody>
                                {people.map(p => <PersonRow person={p} key={p.id}
                                    onEditClick={() => this.onEditClick(p)}
                                    onDeleteClick={() => this.onDeleteClick(p.id)}   />)}
                           </tbody>
                       </table>
                   </div>
               </div>
           </div> 

         );
    }
}
 
export default PeopleTable;