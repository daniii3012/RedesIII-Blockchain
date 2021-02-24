import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../app/services/auth/auth.service';
import { BlockchainService } from '../../../app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  userData: any;
  vote: boolean;

  constructor(
    public auth: AuthService,
    public blockchain: BlockchainService
    ) {
    this.vote = true;

    this.auth.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          this.auth.getUserRole(auth.uid).subscribe(
            user => {
              if (user) {
                this.userData = user;
                this.vote = user.vote!;
              }
            }
          )
        }
      }
    )
  }

  ngOnInit(): void {
  }

  vote_1() {
    let body = {
      "author" : this.userData.email,
      "content" : "Rojo"
    }
    this.blockchain.new_transaction(body).subscribe(data => {
      console.log(data)
    });
    this.update_vote();
  }

  vote_2() {
    let body = {
      "author" : this.userData.email,
      "content" : "Azul"
    }
    this.blockchain.new_transaction(body).subscribe(data => {
      console.log(data)
    });
    this.update_vote();
  }

  update_vote() {
    let data = {
      id: this.userData.id,
      email: this.userData.email,
      role: this.userData.role,
      vote: true
    };
    this.auth.updateUserVote(data);
  }

}
