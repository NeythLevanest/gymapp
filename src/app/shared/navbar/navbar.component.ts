import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserBasicInfo } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/userServices/authentication.service';
import { ProfileService } from 'src/app/services/userServices/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  infoProfileUser!: UserBasicInfo;
  public nameToLookup:String = "Nombre de Usuario";
  public iconNameLookup!:String;
  
  constructor(
    public _authenticationService:AuthenticationService,
    public router:Router,
    private _profileUsersService: ProfileService,
  ) {
    this.loadUserBasicInfo()
  }

  ngOnInit(): void {
    //this.loadUserBasicInfo()
  }

  loadUserBasicInfo()
  {
    let userId = localStorage.getItem('id');
     this._profileUsersService.getUserBasicInfo(userId)
     .subscribe((resp:any) =>{
       this.infoProfileUser = resp;
       if(this.infoProfileUser)
       {
         this.nameToLookup = this.infoProfileUser.first_name+" "+this.infoProfileUser.last_name;
         this.iconNameLookup = this.infoProfileUser.first_name.charAt(0) + this.infoProfileUser.last_name.charAt(0);
       }
       else
       {
         this.nameToLookup = "Nombre de Usuario";
       }
     });
  }
}
