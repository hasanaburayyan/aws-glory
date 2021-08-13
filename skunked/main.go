package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type Participant struct {
	Name string `json:"Name"`
	Certs []AttemptedCert `json:"Certificates"`
}

type AttemptedCert struct {
	Cert Certificate `json:"Certificate"`
	Status string `json:"Status"`
}

type Certificate struct {
	Name string `json:"CertificateName"`
	Level string `json:"Level"`
}

type GloryData struct {
	Participants []Participant
	Certificates []Certificate
}

func (p Participant) HasCertificate(certificate Certificate) bool {
	for _, cert := range p.Certs {
		if cert.Cert.Name == certificate.Name && cert.Status == "Completed" {
			if cert.Cert.Level == certificate.Level {
				return true
			}
		}
	}
	return false
}

func (p Participant) InProgress(certificate Certificate) bool {
	for _, cert := range p.Certs {
		if cert.Cert.Name == certificate.Name && cert.Status == "In Progress" {
			if cert.Cert.Level == certificate.Level {
				return true
			}
		}
	}
	return false
}

func main() {
	participants := getParticipants("participants")
	certificates := getCertificates("certificates")
	listenPort := func() string {
		if os.Getenv("LISTEN_PORT") != "" {
			return os.Getenv("LISTEN_PORT")
		}
		return "80"
	}

	gloryData:= GloryData{
		Participants: participants,
		Certificates: certificates,
	}

	templates := template.Must(template.ParseFiles("templates/index.gohtml"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if err := templates.ExecuteTemplate(w, "index.gohtml", gloryData); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	fmt.Println("Listening on port: " + listenPort())
	fmt.Println(http.ListenAndServe(":" + listenPort(), nil))
}


func getParticipants(participantDirectory string) []Participant {
	var participants []Participant

	files, err := ioutil.ReadDir(participantDirectory)
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		participant := readParticipantFile(fmt.Sprintf("%s/%s", participantDirectory, f.Name()))
		log.Printf("Adding Participant: %s\n", participant.Name)
		participants = append(participants, participant)
	}

	return participants
}

func getCertificates(certificateDirectory string) []Certificate {
	var certificates []Certificate

	files, err := ioutil.ReadDir(certificateDirectory)
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		certificate := readCertificateFile(fmt.Sprintf("%s/%s", certificateDirectory, f.Name()))
		certificates = append(certificates, certificate...)
	}

	return certificates
}

func readParticipantFile(fileName string) Participant {
	var participant Participant

	json.Unmarshal(getJsonBytesFromFile(fileName), &participant)

	return  participant
}

func readCertificateFile(fileName string) []Certificate {
	var certificate []Certificate

	json.Unmarshal(getJsonBytesFromFile(fileName), &certificate)

	return  certificate
}

func getJsonBytesFromFile(fileName string) []byte {
	jsonFile, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	return byteValue
}