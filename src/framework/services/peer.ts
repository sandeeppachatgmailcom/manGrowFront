class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
             
          ],
        },
      ],
    });

    // Optional: Add event handlers for debugging
    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("New ICE candidate: ", event.candidate);
      }
    };

    this.peer.onconnectionstatechange = (event) => {
      console.log("Connection state change: ", this.peer.connectionState);
    };
  }

  // async getAnswer(offer) {
  //   if (this.peer) {
  //     try {
  //       console.log('Setting remote description', this.peer);
  //       await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
  //       const ans = await this.peer.createAnswer();
  //       console.log('Answer created', ans);
  //       await this.peer.setLocalDescription(ans);
  //       return ans;
  //     } catch (error) {
  //       console.error("Error creating answer: ", error);
  //       throw error;
  //     }
  //   } else {
  //     throw new Error("Peer connection is not initialized.");
  //   }
  // }
  isValidStateForLocalDescription(peer) {
    console.log(peer,'peer------------>>>>>>>>>',peer && ['connecting', 'have-local-offer'].includes(peer.connectionState))
    return peer && ['connecting', 'have-local-offer'].includes(peer.connectionState);
  }
  async setLocalDescription(description) {
    console.log(this.peer, "peer");
    if (!this.isValidStateForLocalDescription(this.peer)) {
      console.error("Peer connection not in a valid state:", this.peer.connectionState);
      throw new Error("Peer connection not initialized or in wrong state.");
    }
  
    try {
      console.log(this.peer, "peer", description);
      console.log("Setting local description", description);
      await this.peer.setLocalDescription(description);
    } catch (error) {
      console.error("Error setting local description: ", error);
      throw error; // Re-throw for handling in calling code
    }
  }

   handleStateChange() {
    const state = this.peer.connectionState;
    console.log("New connection state:", state);
  
    // Implement specific actions based on state changes (e.g., initiate answer creation)
    if (state === 'have-remote-offer' || state === 'connecting') {
      // ... (e.g., call getAnswer to generate answer and send back to caller)
    }
  }
  async setRemoteDescription(description) {
  if (this.peer) {
    try {
      console.log("Setting remote description:", description);

      // Ensure valid SDP type (should be 'offer' in this context)
      if (description.type !== 'offer') {
        throw new Error("Invalid SDP type. Expected 'offer'.");
      }

      await this.peer.setRemoteDescription(new RTCSessionDescription(description));
      console.log("Remote description set successfully.");

      // Handle potential state changes (might vary based on library)
      this.handleStateChange();
      
    } catch (error) {
      console.error("Error setting remote description:", error);
      throw error; // Re-throw for potential caller handling
    }
  } else {
    throw new Error("Peer connection is not initialized.");
  }
}

  //   async getOffer() {
  //     if (this.peer) {
  //       try {
  //         const offer = await this.peer.createOffer();
  //         await this.peer.setLocalDescription(offer);
  //         return offer;
  //       } catch (error) {
  //         console.error("Error creating offer: ", error);
  //         throw error;
  //       }
  //     } else {
  //       throw new Error("Peer connection is not initialized.");
  //     }
  //   }
  // }
  async getAnswer(offer) {
    if (this.peer.connectionState === "connected") {
      // Negotiation might have already happened, handle appropriately
      console.error(
        "Peer connection already in 'connected' state, cannot set local answer."
      );
      return; // Or throw an error to handle this case in your component
    }

    if (this.peer) {
      try {
        console.log("Setting remote description", this.peer);
        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const ans = await this.peer.createAnswer();
        await this.peer.setLocalDescription(ans);
        return ans;
      } catch (error) {
        console.error("Error creating or setting answer: ", error);
        throw error;
      }
    } else {
      throw new Error("Peer connection is not initialized.");
    }
  }

  async getOffer() {
    console.log(this.peer,'88888888888888888888888888888888888888888888888888')
    if (this.peer) {
      try {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        console.log(this.peer,'88888888888888888888888888888888888888888888888888')
        return offer;
      } catch (error) {
        console.error("Error creating offer: ", error);
        throw error;
      }
    } else {
      throw new Error("Peer connection is not initialized.");
    }
  }
}
export default PeerService;
