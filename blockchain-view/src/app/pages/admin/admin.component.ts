import { Component, OnInit } from '@angular/core';

import { BlockchainService } from '../../../app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  unconfirmedTx: any;
  chain: any;

  constructor(public blockchain: BlockchainService) { }

  ngOnInit(): void {
    this.getUnconfirmedTx();
    this.getChain();
  }

  getUnconfirmedTx() {
    this.blockchain.pending_tx().subscribe(data => {
      console.log(data)
      this.unconfirmedTx = data;
    })
  }

  getChain() {
    this.blockchain.chain().subscribe(data => {
      console.log(data)
      this.chain = data;
    })
  }

  mine() {
    this.blockchain.mine().subscribe(data => {
      console.log(data)
    });
  }

}
