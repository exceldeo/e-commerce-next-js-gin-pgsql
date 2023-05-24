package utils

import (
	"math/rand"
	"strings"
	"time"
)

func GenerateSlug(title string) string {
	rand.Seed(time.Now().UnixNano())
	slug := strings.ReplaceAll(title, " ", "-")
	slug += "-" + RandStringBytes(8)
	return slug
}