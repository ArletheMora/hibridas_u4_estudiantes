import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './../models/student';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  public student: Student;
  public myForm: FormGroup;
  public validationMessages: object;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private studentService: StudentService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
     this.student = {
      controlnumber: '',
      name: '',
      curp: '',
      age: 0,
      nip: 0,
      email: '',
      career: '',
      photo: '',
      id: ''
    }
    console.log(this.student); 

    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentService.getStudentByID(params.id).subscribe((item) => {
        console.log(item);
        this.student = item as Student;
      });
 
      this.llenarCampos()
    });
  }

  ngOnInit() {
    
    
  }

  public llenarCampos(){
    this.myForm = this.fb.group({
      controlnumber: [
        this.student.controlnumber,
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      name: [this.student.name, Validators.required],
      curp: [
        this.student.curp,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'
          ),
        ]),
      ],
      age: [this.student.age, Validators.compose([Validators.required, Validators.min(17)])],
      nip: [this.student.nip, Validators.compose([Validators.required, Validators.min(10)])],
      email: [
        this.student.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      career: [this.student.career, Validators.required],
      photo: [
        this.student.photo,
        Validators.compose([Validators.required]),
      ],
    });

    this.validationMessages = {
      controlnumber: [
        { type: 'required', message: 'Debe capturar el número de control' },
        {
          type: 'minlength',
          message: 'El número de control parece estar mal formado',
        },
        {
          type: 'pattern',
          message: 'El número de control debe contener sólo números',
        },
      ],
      name: [{ type: 'required', message: 'Debe capturar el nombre' }],
      curp: [
        { type: 'required', message: 'Debe capturar la CURP' },
        { type: 'pattern', message: 'La CURP parece estar mal formada' },
      ],
      age: [
        { type: 'required', message: 'Debe capturar la edad' },
        { type: 'min', message: 'La edad es incorrecta' },
      ],
      nip: [
        { type: 'required', message: 'Debe capturar el NIP' },
        { type: 'min', message: 'El NIP debe ser mayor a 9' },
      ],
      email: [
        { type: 'required', message: 'Debe capturar el email' },
        { type: 'email', message: 'El email parece estar mal formado' },
      ],
      career: [{ type: 'required', message: 'Debe capturar la carrera' }],
      photo: [
        { type: 'required', message: 'Debe capturar la url de la fotografía' },
      ],
    };
  }
  public updateStudent(){
    this.studentService.updateStudent(this.student.id, this.student);
  }
}
