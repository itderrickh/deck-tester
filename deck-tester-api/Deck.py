import json

class Deck():
	def __init__(self, name, icons, description, decklist, matchups):
		self.name = name
		self.icons = icons
		self.description = description
		self.decklist = decklist
		self.matchups = matchups

	def serialize(self):
		return json.loads(json.dumps(self, default=lambda o: o.__dict__))